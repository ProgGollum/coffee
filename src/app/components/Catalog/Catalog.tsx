'use client'

import React, {useEffect, useState} from 'react';
import s from "./Catalog.module.scss"
import axios from "axios";

import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";


interface Coffee {
    id: number,
    title: string,
    description: string,
    image: string,
    price: string
}

const Catalog = () => {
    const [coffee, setCoffee] = useState<Coffee[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchCoffeeData = async () => {
        try {
            const response = await axios.get<Coffee[]>('https://api.sampleapis.com/coffee/hot');
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
    };

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
        <section className={s.catalog}>
            <div className="container">
                <h1 className={s.catalog__title}>Catalog</h1>
                <ul className={s.catalog__list}>
                    {coffee.slice(0, 3).map(item => (
                        <li key={item.id} className={s.catalog__item}>
                            <Link className={s.item__img} href={"/"}>
                                <img
                                    src={item.image}
                                    alt={"Coffee"}
                                    width={"338px"}
                                    height={"200px"}
                                />
                            </Link>
                            <h2 className={s.item__title}>{item.title}</h2>
                            <div className={s.item__price}>
                                <span>${item.price}</span>
                                <button><CiHeart className={s.item__price_fav}/></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Catalog;