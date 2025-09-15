import Search from "./search/search";
export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center gap-16">
            <h2 className="text-5xl font-bold"> How's the sky looking today? </h2>
            <Search />
        </div>
    );
}