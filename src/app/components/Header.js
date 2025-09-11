import Image from 'next/image';
export default function Header(){
    return(
        <header className="flex justify-between items-center px-28 py-12">
            <Image src="./assets/images/logo.svg" alt="Weather Now" width={180} height={40} />
            <div className="flex items-center gap-1 bg-[#0a0a0aa7] cursor-pointer px-4 py-2 rounded">
                <Image src="./assets/images/icon-units.svg" alt="gear" width={16} height={16} />
                <p className="text-neutral-50">Units</p>
                <Image src="./assets/images/icon-dropdown.svg" alt="dropdown" width={16} height={16} />
            </div>
        </header>
    )
}