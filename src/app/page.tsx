import Hero from "@/app/components/Hero/Hero";
import Roasted from "@/app/components/Roasted/Roasted";
import Catalog from "@/app/components/Catalog/Catalog";
import News from "@/app/components/News/News";

export default function Home() {
    return (
        <main className="main">
            <Hero/>
            <Roasted/>
            <Catalog/>
            <News/>
        </main>
    );
}
