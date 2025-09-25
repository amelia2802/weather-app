import Search from "./search/search";
import City from "./city-forecast/City";
import Hours from "./hourly-forecast/Hours";
export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center gap-16">
            <h2 className="text-5xl font-bold"> How's the sky looking today? </h2>
            <Search />
            <div className="flex gap-8">
                <City />
                <Hours />
            </div>
        </div>
    );
}