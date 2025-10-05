"use client";

import { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import Image from 'next/image';

export default function City({cityData}){
    const [weatherData, setWeatherData] = useState(null);

    const defaultCity = {
        name:"Siliguri, India", 
        latitude: 26.71, 
        longitude: 88.36, 
    }

    const currentCity = cityData || defaultCity

    useEffect(() => {
        async function getWeather() {
            const params = {
                "latitude": currentCity.latitude,
                "longitude": currentCity.longitude,
                "hourly": "temperature_2m,precipitation,relativehumidity_2m,windspeed_10m,apparent_temperature",
                "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode",
                "current_weather":true
            };

            const url = "https://api.open-meteo.com/v1/forecast";
            const responses = await fetchWeatherApi(url, params);
            const response = responses[0];
            const current = response.current();
            const hourly = response.hourly();
            const daily = response.daily();

            const range = (start, stop, step) =>
                Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

            const data = {
                current: {
                    temperature: current.variables(0).value(),
                    windSpeed: current.variables(1).value(),
                },
                hourly: {
                    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                        (t) => new Date((t + response.utcOffsetSeconds()) * 1000)
                    ),
                    temperature: hourly.variables(0).valuesArray(),
                    precipitation: hourly.variables(1).valuesArray(),
                    humidity: hourly.variables(2).valuesArray(),
                    windSpeed: hourly.variables(3).valuesArray(),
                    feelsLike: hourly.variables(4).valuesArray(),
                },
                daily: {
                    time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                        (t) => new Date((t + response.utcOffsetSeconds()) * 1000)
                    ),
                    maxTemp: daily.variables(0).valuesArray(),
                    minTemp: daily.variables(1).valuesArray(),
                    precipitationSum: daily.variables(2).valuesArray(),
                    maxWindSpeed: daily.variables(3).valuesArray(),
                    weatherCode: daily.variables(4).valuesArray(),
                }
            };
            
            setWeatherData(data);
        }
        
        getWeather();
    }, [currentCity.latitude, currentCity.longitude]);

    const currentDate = new Date();
    
   
    const currentTemp = weatherData?.current?.temperature ? Math.round(weatherData.current.temperature) : null;
    const currentWindSpeed = weatherData?.current?.windSpeed ? Math.round(weatherData.current.windSpeed) : null;
    const currentFeelsLike = weatherData?.hourly?.feelsLike?.[0] ? Math.round(weatherData.hourly.feelsLike[0]) : null;
    const currentHumidity = weatherData?.hourly?.humidity?.[0] ? Math.round(weatherData.hourly.humidity[0]) : null;
    const currentPrecipitation = weatherData?.hourly?.precipitation?.[0]?.toFixed(1) || null;


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
        <div>
            <div className="rounded-3xl flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 py-20 px-6 text-white">
                {!weatherData ? (
                    <div className="w-full text-center">
                        <p className="text-2xl">Loading weather data...</p>
                    </div>
                ) : (
                    <>
                        <div>
                            <h3 className="text-3xl font-bold">{currentCity.name}</h3>
                            <p className="text-lg">{currentDate.toDateString()}</p>
                        </div>
                        <div className="flex flex-row-reverse items-center">
                            <p className="text-8xl font-light">{currentTemp}°C</p>
                            <Image src={getWeatherIcon(weatherData.daily.weatherCode[0])} alt="weather" width={120} height={120}/>
                        </div>
                    </>
                )}
            </div>
            
            {weatherData && (
                <>
                    <div className="flex items-center gap-6 justify-evenly my-8">
                        <div className="forecast">
                            <h3>Feels like</h3>
                            <p>{currentFeelsLike}°C</p>
                        </div>
                        <div className="forecast">
                            <h3>Humidity</h3>
                            <p>{currentHumidity}%</p>
                        </div>
                        <div className="forecast">
                            <h3>Wind</h3>
                            <p>{currentWindSpeed} km/h</p>
                        </div>
                        <div className="forecast">
                            <h3>Precipitation</h3>
                            <p>{currentPrecipitation} mm</p>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="mb-5 text-xl font-bold">Daily forecast</h2>
                        <div className="flex items-center justify-between gap-4">
                            {weatherData.daily.time.slice(0, 7).map((date, index) => {
                                const maxTemp = Math.round(weatherData.daily.maxTemp[index]);
                                const minTemp = Math.round(weatherData.daily.minTemp[index]);
                                
                                return(
                                    <div key={index} className="daily-cast">
                                        <h4>{date.toLocaleDateString('en-US', { weekday: 'short' })}</h4>
                                        <Image src={getWeatherIcon(weatherData.daily.weatherCode[0])} alt="weather" width={40} height={40}/>
                                        <div className="flex gap-12">
                                            <p>{maxTemp}°</p>
                                            <p>{minTemp}°</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}