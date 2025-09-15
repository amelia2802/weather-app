import Image from 'next/image';
export default function Search(){
    return(
        <div>
            <div className="flex items-center gap-4 ">
                <Image className="absolute ml-6" src={"./assets/images/icon-search.svg"} alt="search" width={16} height={16} />
                <input className="w-xl bg-neutral-700 rounded-xl px-12 py-4 cursor-pointer" type="text" placeholder="Search for a city, e.g., New York" />
                <button className="bg-blue-700 rounded-2xl px-6 py-4 cursor-pointer">Search</button>
            </div>
        </div>
    )
}