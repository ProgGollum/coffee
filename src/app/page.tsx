'use client'

import Hero from "@/components/Hero/Hero";
import Roasted from "@/components/Roasted/Roasted";
import Catalog from "@/components/Catalog/Catalog";
import News from "@/components/News/News";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = auth?.check();
            if (!isAuth) {
                router.push("/login")
            }
        };

        checkAuth();
    }, [auth]);

    return (
        <main className="main">
            <Hero/>
            <Roasted/>
            <Catalog slice={6}/>
            <News/>
        </main>
    );
}
