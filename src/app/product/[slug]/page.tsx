'use client'

import React, {useState} from 'react';
import s from "./page.module.scss"
import {useParams} from "next/navigation";
import {useCart} from "@/context/CoffeeContext";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT_BY_ID} from "@/gql/gql";
import {Chip} from "@mantine/core";
import Buttons from "@/UI/Buttons/Buttons";
import edjsHTML from "editorjs-html"
import {block} from "sharp";
import xss from 'xss';
import Catalog from "@/components/Catalog/Catalog";


interface GetProductByIdResponse {
    product: {
        id: string;
        name: string;
        description: string;
        slug: string;
        thumbnail: {
            url: string;
            alt: string;
        };
        pricing: {
            priceRange: {
                start: {
                    gross: {
                        amount: number;
                        currency: string;
                    };
                };
            };
        };
    };
}




const Page = () => {
    const {slug} = useParams<{ slug: string }>()



    const {loading, error, data} = useQuery<GetProductByIdResponse>(GET_PRODUCT_BY_ID, {
        variables: {slug: slug},
        skip: !slug
    })
    const [selectedSize, setSelectedSize] = useState<string>("XL");
    const {addToCart} = useCart();
    const product = data?.product

    if (loading) return <p>...Loading</p>
    if (error) return <p>Error: {error.message}</p>
    if (!product) return <p>Product not found</p>
    const descriptionObject = JSON.parse(product.description)
    const edjsParser = edjsHTML();
    let description_html = edjsParser.parse(descriptionObject)


    return (
        <main className={s.main}>
            <section className={s.product}>
                <div className="container">
                    <h1 className={s.product__title}>{product.name}</h1>
                    <div className={s.product__wrapper}>
                        <div className={s.product__block}>
                            <img
                                src={product.thumbnail.url}
                                alt={product.thumbnail.alt}
                                width={780}
                                height={520}
                            />
                        </div>
                        <div className={s.product__info}>
                            <span className={s.product__info_price}>
                                {product.pricing.priceRange.start.gross.amount} {product.pricing.priceRange.start.gross.currency}
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
                            <Buttons onClick={() => product && selectedSize && addToCart({
                                ...product,
                                size: selectedSize
                            })} text={"Add to cart"} isTransparent={false} isBig={true}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className={s.desc}>
                <div className="container">
                    <h1 className={s.desc__title}>Description</h1>
                    <div className={s.desc__block} dangerouslySetInnerHTML={{__html: xss(description_html)}}/>
                </div>
            </section>
            <Catalog slice={3}/>
        </main>
    );
};

export default Page;