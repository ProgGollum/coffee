'use client'

import React, {useEffect, useState} from 'react';
import {useCart} from "@/context/CoffeeContext";
import s from "./page.module.scss"
import { FaTrashAlt } from 'react-icons/fa';
import {NativeSelect} from "@mantine/core";
import Buttons from '@/UI/Buttons/Buttons';

const Page = () => {
    const {cartItems, removeFromCart} = useCart()
    const [value, setValue] = useState<number>(1)

    return (
        <main className={s.cart}>
            <div className="container">
                <h1 className={s.cart__title}>Cart</h1>
                {cartItems?.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    <div className={s.cart__wrapper}>
                        <ul className={s.cart__list}>
                            {cartItems?.map(item => (
                                <li className={s.cart__list_item} key={item.id}>
                                    <div className={s.item__img}><img src={item.thumbnail.url} alt=""/></div>
                                    <div className={s.item__lines}>
                                        <div className={s.item__lines_upper}>
                                            <span>{item.name}</span>
                                            <FaTrashAlt onClick={() => removeFromCart(item.id)}/>
                                        </div>
                                        <span className={s.item__lines_middle}>{item.size}</span>
                                        <div className={s.item__lines_under}>
                                            <NativeSelect
                                                value={value}
                                                onChange={(event) => setValue(Number(event.target.value))}
                                                size="xs"
                                                radius="md"
                                                data={['1', '2', '3', '4', '5']}
                                            />
                                            <span>{item.pricing.priceRange.start.gross.amount * value}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <div>
                                <span>Price:</span>
                                <span>$19.99</span>
                            </div>
                            <div>
                                <span>Delivery:</span>
                                <span>$10.00</span>
                            </div>
                            <div>
                                <span>Total price:</span>
                                <span>$29.99</span>
                            </div>
                            <Buttons text={"Checkout"} isBig={true} isTransparent={false}/>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Page;