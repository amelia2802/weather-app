import Search from "./search/search";
import City from "./city-forecast/City";
export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center gap-16">
            <h2 className="text-5xl font-bold"> How's the sky looking today? </h2>
            <Search />
            <City />
        </div>
    );
}