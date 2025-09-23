import Image from 'next/image';
export default function City(){
    return(
        <div>
            <div className="rounded-3xl flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 py-20 px-6">
                <div>
                    <h3 className="text-3xl">City, Country</h3>
                    <p className="text-lg">Date</p>
                </div>
                <p className="text-8xl">0</p>
                <Image className="absolute left-3/5" src={"/assets/images/icon-sunny.webp"} alt="sun" width={120} height={120}/>
            </div>
            <div className="flex items-center gap-6 justify-between my-8">
                <div className="forecast">
                    <h3>Feels like</h3>
                    <p>Temperature</p>
                </div>
                <div className="forecast">
                    <h3>Humidity</h3>
                    <p>%</p>
                </div>
                <div className="forecast">
                    <h3>Wind</h3>
                    <p>km/h</p>
                </div>
                <div className="forecast">
                    <h3>Precipitation</h3>
                    <p>mm</p>
                </div>
            </div>
            <div>
                <h2 className="mb-5 text-xl">Daily forecast</h2>
                <div className="flex items-center justify-between gap-4">
                    <div className="daily-cast">
                        <h4>Day</h4>
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <div className="flex gap-12">
                            <p>day</p>
                            <p>night</p>
                        </div>
                    </div>
                    <div className="daily-cast">
                        <h4>Day</h4>
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <div className="flex gap-12">
                            <p>day</p>
                            <p>night</p>
                        </div>
                    </div>
                    <div className="daily-cast">
                        <h4>Day</h4>
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <div className="flex gap-12">
                            <p>day</p>
                            <p>night</p>
                        </div>
                    </div>
                    <div className="daily-cast">
                        <h4>Day</h4>
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <div className="flex gap-12">
                            <p>day</p>
                            <p>night</p>
                        </div>
                    </div>
                    <div className="daily-cast">
                        <h4>Day</h4>
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <div className="flex gap-12">
                            <p>day</p>
                            <p>night</p>
                        </div>
                    </div>
                    <div className="daily-cast">
                        <h4>Day</h4>
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <div className="flex gap-12">
                            <p>day</p>
                            <p>night</p>
                        </div>
                    </div>
                    <div className="daily-cast">
                        <h4>Day</h4>
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <div className="flex gap-12">
                            <p>day</p>
                            <p>night</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}