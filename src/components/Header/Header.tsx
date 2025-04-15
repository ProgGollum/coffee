'use client'

import React, {useEffect, useState} from 'react';
import s from "./Header.module.scss"
import Link from "next/link";

import Image from "next/image";
import logo from "../../../public/logo.svg";
import {CgProfile} from "react-icons/cg";
import {CiHeart} from "react-icons/ci";
import {FaShoppingCart, FaTrashAlt} from "react-icons/fa";
import {RiMenuFoldLine} from "react-icons/ri";

import classNames from "classnames";
import {usePathname} from "next/navigation";
import Menu from "@/UI/Menu/Menu";
import IMenu from "@/types/IMenu";
import IUserButtons from "@/types/IUserButtons";
import {Modal} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useCart} from "@/context/CoffeeContext";


const Header = () => {

    const [opened, {open, close}] = useDisclosure(false)

    const pages: IMenu[] = [
        {id: 1, href: "/", value: "Home"},
        {id: 2, href: "/about", value: "About"},
        {id: 3, href: "/menu", value: "Menu"},
        {id: 4, href: "/reservation", value: "Reservation"},
    ];

    const userButtons: IUserButtons[] = [
        {id: 1, href: "/", icon: <CgProfile/>},
        {id: 2, href: "/", icon: <CiHeart/>},
        {id: 3, href: "/cart", icon: <FaShoppingCart/>},
    ]

    const pathname = usePathname();
    const [isActive, setIsActive] = useState<boolean>(false)
    const {cartItems, removeFromCart} = useCart();

    return (
        <section className={s.header}>
            <div className="container">
                <div className={s.header__wrapper}>
                    <nav className={s.nav}>
                        <ul className={s.nav__list}>
                            <li className={s.nav__item}>
                                <Link href={"/"}
                                      className={classNames(s.nav__item_link, pathname === "/" ? s.active : {})}>Home</Link>
                            </li>
                            <li className={s.nav__item}>
                                <Link href={"/about"}
                                      className={classNames(s.nav__item_link, pathname === "/about" ? s.active : {})}>About</Link>
                            </li>
                            <li className={s.nav__item}>
                                <Link href={"/menu"}
                                      className={classNames(s.nav__item_link, pathname === "/menu" ? s.active : {})}>Menu</Link>
                            </li>
                            <li className={s.nav__item}>
                                <Link href={"/reservation"}
                                      className={classNames(s.nav__item_link, pathname === "/reservation" ? s.active : {})}>Reservation</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={s.logo}>
                        <Link href={"/"}><Image src={logo} alt="Logo"/></Link>
                    </div>
                    <ul className={s.buttons}>
                        <li className={s.buttons__button}>
                            <Link href={"/register"}><CgProfile/></Link>
                        </li>
                        <li className={s.buttons__button}>
                            <Link href={"/"}><CiHeart/></Link>
                        </li>
                        <li className={s.buttons__button}>
                            <FaShoppingCart style={{cursor: "pointer"}} onClick={open}/>
                        </li>
                    </ul>
                    <div className={s.menu__button} onClick={() => setIsActive(!isActive)}>
                        <RiMenuFoldLine/>
                    </div>
                    <Menu active={isActive} setActive={setIsActive} pathname={pathname} pages={pages}
                          userButtons={userButtons}/>
                    <Modal opened={opened} onClose={close} withCloseButton={false} centered={true}>
                        <h1 className={s.modal__title}>Cart</h1>
                        {cartItems?.length === 0 ? (
                            <p>Cart is empty</p>
                        ) : (
                            <ul className={s.modal__list}>
                                {cartItems?.map(item => (
                                    <li className={s.modal__item} key={item.id}>
                                        <div className={s.item__block_left}>
                                            <img className={s.item__img} src={item.thumbnail.url} alt="Hello" width={100} height={100}/>
                                            <div className={s.item__info}>
                                                <h2 className={s.item__title}>{item.name}</h2>
                                                <span className={s.item__size}>{item.size}</span>
                                                <span className={s.item__count}>count</span>
                                            </div>
                                        </div>
                                        <div className={s.item__block_right}>
                                            <div onClick={() => removeFromCart(item.id)}>
                                                <FaTrashAlt/>
                                            </div>
                                            <span className={s.item__price}>{item.pricing.priceRange.start.gross.currency} {item.pricing.priceRange.start.gross.amount}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Modal>
                </div>
            </div>
        </section>
    );
};

export default Header;