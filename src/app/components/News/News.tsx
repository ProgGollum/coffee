'use client'

import React, {useEffect, useState} from 'react';
import s from "./News.module.scss"
import axios from "axios";

interface Coffee {
    id: number,
    title: string,
    description: string,
    image: string,
    price: string
}

const News = () => {
    const [coffee, setCoffee] = useState<Coffee[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCoffeeData = async () => {
        try {
            const response = await axios.get<Coffee[]>("https://api.sampleapis.com/coffee/hot");
            setCoffee(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
            } else {
                setError('Неизвестная ошибка');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCoffeeData();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <section className={s.news}>
            <div className="container">
                <h1 className={s.news__title}>News</h1>
                <ul className={s.news__list}>
                    {coffee.slice(0, 3).map(item => (
                        <li key={item.id} className={s.news__item}>
                            <div className={s.news__item_img}>
                                <img src={item.image} alt="Coffee News" width={"386px"} height={"239px"}/>
                            </div>
                            <div className={s.news__item_desc}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default News;