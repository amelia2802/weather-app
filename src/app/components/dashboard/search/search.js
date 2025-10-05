"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Search({onCitySelect}){
    const [searchCity, setSearchCity] = useState("");

    const handleChange = (e) => {
        setSearchCity(e.target.value);
    }

    async function searchCoordinates(){
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1&language=en&format=json`;
        const response = await fetch(url);
        const data = await response.json();

        if(data.results && data.results.length > 0){
            const city = data.results[0];

            const cityData = {
                name: `${city.name}, ${city.country}`,
                latitude: city.latitude,
                longitude: city.longitude,
            }
            onCitySelect(cityData);
            setSearchCity("");
        }
        else{
            setSearchCity("City not found");
        }
    }

    return(
        <div>
            <div className="flex items-center gap-4 ">
                <Image className="absolute ml-6" src={"./assets/images/icon-search.svg"} alt="search" width={16} height={16} />
                <input 
                    className="w-xl bg-neutral-700 rounded-xl px-12 py-4 cursor-pointer" 
                    type="text" 
                    placeholder="Search for a city, e.g., New York" 
                    value={searchCity} 
                    onChange={handleChange}
                />
                <button className="bg-blue-700 rounded-2xl px-6 py-4 cursor-pointer" onClick={searchCoordinates}>Search</button>
            </div>
        </div>
    )
}