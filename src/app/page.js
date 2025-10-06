import Header from "./components/Header";
import DashboardPage from "./components/dashboard/page";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="max-[500px]:m-auto max-[500px]:px-4 max-[500px]:flex flex-col items-center">
      <Header />
      <DashboardPage />
      <Footer />
    </div>
  );
}
