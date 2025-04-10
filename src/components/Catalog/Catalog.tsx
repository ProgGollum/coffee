'use client'

import React, {FC} from 'react';
import s from "./Catalog.module.scss"

import { CiHeart } from "react-icons/ci";
import Link from "next/link";
import {useQuery} from "@apollo/client";
import {GET_PRODUCTS} from "@/gql/gql";
import {IProductsResponse} from "@/types/IProductResponse";

interface CatalogProps {
    slice: number
}



const Catalog:FC<CatalogProps> = ({slice}) => {
    const {loading, error, data} = useQuery<IProductsResponse>(GET_PRODUCTS);
    const products = data?.products.edges;

    if (loading) return <p>...Loading</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <section className={s.catalog}>
            <div className="container">
                <h1 className={s.catalog__title}>Catalog</h1>
                <ul className={s.catalog__list}>
                    {products?.slice(0, slice).map(({node}) => (
                        <li key={node.id} className={s.catalog__item}>
                            <Link className={s.item__img} href={`/product/${node.slug}`}>
                                <img
                                    src={node.thumbnail.url}
                                    alt={node.thumbnail.alt}
                                    width={"338px"}
                                    height={"200px"}
                                />
                            </Link>
                            <h2 className={s.item__title}>{node.name}</h2>
                            <div className={s.item__price}>
                                <span>{node.pricing.priceRange.start.gross.currency} {node.pricing.priceRange.start.gross.amount}</span>
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