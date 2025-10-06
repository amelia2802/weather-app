"use client";

import { useState } from "react";
import Search from "./search/search";
import City from "./city-forecast/City";
import Hours from "./hourly-forecast/Hours";

export default function DashboardPage() {
    const [city, setCity] = useState(null);

    const handleCity = (city) =>{
        setCity(city);
    }

    return (
        <div className="flex flex-col items-center gap-16">
            <h2 className="text-5xl text-center font-bold"> How&apos;s the sky looking today? </h2>
            <Search onCitySelect={handleCity} />
            <div className="flex gap-8 max-[800px]:flex-col max-[800px]:p-6">
                <City cityData={city}/>
                <Hours cityData={city}/>
            </div>
        </div>
    );
}