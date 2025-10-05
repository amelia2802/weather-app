import {useState, useEffect} from "react";
import {fetchWeatherApi} from "openmeteo";
import Image from 'next/image';

export default function Hours({cityData}){
    const [weatherData,setWeatherData] = useState(null);
    const [selectDay,setSelectDay] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const defaultCity = {
        name:"Siliguri, India", 
        latitude: 26.71, 
        longitude: 88.36, 
        timezone: "Asia/Kolkata"
    }
    
    const currentCity = cityData || defaultCity
    useEffect(() => {
        async function getWeather() {
            const params = {
                "latitude": currentCity.latitude,
                "longitude": currentCity.longitude,
                "hourly": "temperature_2m,precipitation,relativehumidity_2m,windspeed_10m,apparent_temperature",
            };

            const url = "https://api.open-meteo.com/v1/forecast";
            const responses = await fetchWeatherApi(url, params);
            const response = responses[0];
            const hourly = response.hourly();

            const range = (start, stop, step) =>
                Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);


            const data = {

                hourly: {
                    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                        (t) => new Date((t + response.utcOffsetSeconds()) * 1000)
                    ),
                    temperature: hourly.variables(0).valuesArray(),
                    weatherCode: hourly.variables(1).valuesArray(),
                },
            };
            
            setWeatherData(data);
        }
        
        getWeather();
    }, [currentCity.latitude, currentCity.longitude]);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const dayOptions = [];
    for(let i=0;i<7;i++){
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        dayOptions.push({label:dayName,value:i});
    }

    const startHour = selectDay * 24;
    const endHour = startHour + 24;
    const hoursToShow =  weatherData.hourly.time.slice(startHour,endHour)

    function getWeatherIcon(code) {
        if (code === 0) return "/assets/images/icon-sunny.webp";
        if ([1, 2].includes(code)) return "/assets/images/icon-partly-cloudy.webp";
        if (code === 3) return "/assets/images/icon-overcast.webp";
        if ([45, 48].includes(code)) return "/assets/images/icon-fog.webp";
        if ([51, 53, 55].includes(code)) return "/assets/images/icon-drizzle.webp";
        if ([61, 63, 65, 80, 81, 82].includes(code)) return "/assets/images/icon-rain.webp";
        if ([71, 73, 75].includes(code)) return "/assets/images/icon-snow.webp";
        if ([95, 96, 99].includes(code)) return "/assets/images/icon-storm.webp";

        return "/assets/images/icon-loading.webp";
    }

    return(
        <div className="bg-neutral-800 p-6 rounded-xl max-h-[670px] overflow-y-auto">
            <div className="flex gap-3 items-center">
                <h4>Hourly forecast</h4>
                <div className="relative">
                <button 
                    className="flex bg-neutral-600 px-4 py-2 rounded gap-3"
                    onClick={()=> setIsDropdownOpen(!isDropdownOpen)}
                >
                    {dayOptions[selectDay].label}
                    <Image src="./assets/images/icon-dropdown.svg" alt="dropdown" width={16} height={16} /> 
                </button>

                {isDropdownOpen && (
                        <div className="w-56 rounded-xl p-2 absolute top-12 -left-5 bg-neutral-800 border border-neutral-600 rounded shadow-lg z-10">
                            {dayOptions.map((day) => (
                                <button
                                    key={day.value}
                                    className={`w-full text-left p-2 rounded-xl hover:bg-neutral-700 text-white ${
                                        selectDay === day.value ? 'bg-neutral-600' : ''
                                    }`}
                                    onClick={() => {
                                        setSelectDay(day.value);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {day.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {hoursToShow.map((time, index) => {
                    const actualIndex = startHour + index;
                    const temp = Math.round(weatherData.hourly.temperature[actualIndex]);
                    const timeString = time.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        hour12: true
                    });

                    return(
                        <div key={index} className="hourly">
                            <div className="flex items-center">
                                <Image src={getWeatherIcon(Math.floor(weatherData.hourly.weatherCode[index]))} alt={`${Math.floor(weatherData.hourly.weatherCode[index])}`} width={40} height={40}/>
                                <h3>{timeString}</h3>
                            </div>
                            <p>{temp} °C</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}