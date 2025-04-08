'use client'

import React, {useEffect, useState} from 'react';
import s from "./page.module.scss"
import axios from "axios";
import {useParams} from "next/navigation";
import Image from "next/image"
import {Chip} from '@mantine/core';
import Buttons from "@/UI/Buttons/Buttons";
import {useCart} from "@/context/CoffeeContext";

interface Coffee {
    id: number,
    title: string,
    description: string,
    image: string,
    price: number
}

const Page = () => {
    const params = useParams<{ id: string }>()
    const [coffee, setCoffee] = useState<Coffee | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedSize, setSelectedSize] = useState<string>("XL");

    const {addToCart} = useCart();

    const fetchCoffeeData = async () => {
        try {
            const response = await axios.get<Coffee>(`https://api.sampleapis.com/coffee/hot/${params.id}`);
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
        <main className={s.main}>
            <section className={s.product}>
                <div className="container">
                    <h1 className={s.product__title}>{coffee?.title}</h1>
                    <div className={s.product__wrapper}>
                        <div className={s.product__block}>
                            <img
                                src={coffee!.image}
                                alt={"Coffee Image"}
                                width={780}
                                height={520}
                            />
                        </div>
                        <div className={s.product__info}>
                            <span className={s.product__info_price}>
                                $ {coffee?.price}
                            </span>
                            <div className={s.product__info_sizes}>
                                {['L', 'XL', 'XXl'].map(size => (
                                    <Chip
                                        key={size}
                                        checked={selectedSize === size}
                                        onChange={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </Chip>
                                ))}
                            </div>
                            <Buttons onClick={() => coffee && selectedSize && addToCart({
                                ...coffee,
                                size: selectedSize
                            })} text={"Add to cart"} isTransparent={false} isBig={true}/>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
};

export default Page;