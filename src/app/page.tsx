import Hero from "@/components/Hero/Hero";
import Roasted from "@/components/Roasted/Roasted";
import Catalog from "@/components/Catalog/Catalog";
import News from "@/components/News/News";

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
