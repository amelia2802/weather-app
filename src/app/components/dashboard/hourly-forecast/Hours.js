import Image from 'next/image';
export default function Hours(){
    return(
        <div className="bg-neutral-800 p-6 rounded-xl">
            <div className="flex gap-3 items-center">
                <h4>Hourly forecast</h4>
                <button className="flex bg-neutral-600 px-4 py-2 rounded">Day <Image src="./assets/images/icon-dropdown.svg" alt="dropdown" width={16} height={16} /> </button>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="hourly">
                    <div className="flex items-center">
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <h3>Hour</h3>
                    </div>
                    <p>Temp</p>
                </div>
                <div className="hourly">
                    <div className="flex items-center">
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <h3>Hour</h3>
                    </div>
                    <p>Temp</p>
                </div>
                <div className="hourly">
                    <div className="flex items-center">
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <h3>Hour</h3>
                    </div>
                    <p>Temp</p>
                </div>
                <div className="hourly">
                    <div className="flex items-center">
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <h3>Hour</h3>
                    </div>
                    <p>Temp</p>
                </div>
                <div className="hourly">
                    <div className="flex items-center">
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <h3>Hour</h3>
                    </div>
                    <p>Temp</p>
                </div>
                <div className="hourly">
                    <div className="flex items-center">
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <h3>Hour</h3>
                    </div>
                    <p>Temp</p>
                </div>
                <div className="hourly">
                    <div className="flex items-center">
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <h3>Hour</h3>
                    </div>
                    <p>Temp</p>
                </div>
                <div className="hourly">
                    <div className="flex items-center">
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <h3>Hour</h3>
                    </div>
                    <p>Temp</p>
                </div>
                <div className="hourly">
                    <div className="flex items-center">
                        <Image src={"/assets/images/icon-sunny.webp"} alt="sun" width={40} height={40}/>
                        <h3>Hour</h3>
                    </div>
                    <p>Temp</p>
                </div>
            </div>
        </div>
    )
}