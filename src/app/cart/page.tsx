'use client'

import React, {useEffect, useState} from 'react';
import {useCart} from "@/context/CoffeeContext";
import s from "./page.module.scss"
import {FaTrashAlt} from 'react-icons/fa';
import {NativeSelect} from "@mantine/core";
import Buttons from '@/UI/Buttons/Buttons';
import classNames from "classnames";

const Page = () => {
    const {cartItems, removeFromCart} = useCart()
    // const [value, setValue] = useState<number>(1)

    return (
        <main className={s.cart}>
            <div className="container">
                <h1 className={s.cart__title}>Cart</h1>
                <div className={s.cart__wrapper}>
                    <ul className={s.cart__list}>
                        <li className={s.cart__list_item}>
                            <div className={s.right__side}>
                                <div className={s.item__img}><img src="/logo.svg" alt="SVG"/></div>
                                <div className={s.item__info}>
                                    <span>Coffee</span>
                                    <span>XL</span>
                                    <NativeSelect
                                        size={"xs"}
                                        radius={"md"}
                                        data={['1', '2', '3', '4', '5']}
                                    />
                                </div>
                            </div>
                            <div className={s.left__side}>
                                <div className={s.delete__button}>
                                    <FaTrashAlt/>
                                </div>
                                <span>19.99$</span>
                            </div>
                        </li>
                        {/*{cartItems?.map(item => (*/}
                        {/*    <li className={s.cart__list_item} key={item.id}>*/}
                        {/*        <div className={s.item__img}><img src={item.thumbnail.url} alt=""/></div>*/}
                        {/*        <div className={s.item__lines}>*/}
                        {/*            <div className={s.item__lines_upper}>*/}
                        {/*                <span>{item.name}</span>*/}
                        {/*                <FaTrashAlt onClick={() => removeFromCart(item.id)}/>*/}
                        {/*            </div>*/}
                        {/*            <span className={s.item__lines_middle}>{item.size}</span>*/}
                        {/*            <div className={s.item__lines_under}>*/}
                        {/*                <NativeSelect*/}

                        {/*                    size="xs"*/}
                        {/*                    radius="md"*/}
                        {/*                    data={['1', '2', '3', '4', '5']}*/}
                        {/*                />*/}
                        {/*                <span>{item.pricing.priceRange.start.gross.amount}</span>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </li>*/}
                        {/*))}*/}
                    </ul>
                    <div className={s.total}>
                        <div className={s.total__content}>
                            <div className={classNames(s.block, s.price)}>
                                <p>Price: </p>
                                <span>19.99$</span>
                            </div>
                            <div className={classNames(s.block, s.discount)}>
                                <p>Discount: </p>
                                <span>0%</span>
                            </div>
                            <div className={classNames(s.block, s["total-price"])}>
                                <p>Total: </p>
                                <span>19.99$</span>
                            </div>
                            <Buttons text={"Checkout"} isBig={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;