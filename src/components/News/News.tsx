'use client'

import React, {useEffect, useState} from 'react';
import s from "./News.module.scss"
import axios from "axios";
import {useQuery} from "@apollo/client";
import {GET_CATEGORY} from "@/gql/gql";
import {IProductsResponse} from "@/types/IProductResponse";
import edjsHTML from "editorjs-html";
import xss from 'xss';



const News = () => {
    const {loading, error, data} = useQuery<IProductsResponse>(GET_CATEGORY)
    const products = data?.category.products.edges;

    if (loading) return <p>...Loading</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <section className={s.news}>
            <div className="container">
                <h1 className={s.news__title}>News</h1>
                <ul className={s.news__list}>
                    {products?.map(({node}) => (
                        <li key={node.id} className={s.news__item}>
                            <div className={s.news__item_img}>
                                <img src={node.thumbnail.url} alt={node.thumbnail.alt} width={"386px"} height={"239px"}/>
                            </div>
                            <div className={s.news__item_desc}>
                                <h2>{node.name}</h2>
                                {/*<p>{node.descriptionJson}</p>*/}
                                <p dangerouslySetInnerHTML={{__html: xss(edjsHTML().parse(JSON.parse(node.description)))}}></p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default News;