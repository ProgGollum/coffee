'use client'

import React, {useEffect, useState} from 'react';
import s from "./Header.module.scss"
import Link from "next/link";

import Image from "next/image";
import logo from "../../../public/logo.svg";
import {CgProfile} from "react-icons/cg";
import {CiHeart} from "react-icons/ci";
import {FaShoppingCart} from "react-icons/fa";
import { RiMenuFoldLine } from "react-icons/ri";

import classNames from "classnames";
import {usePathname} from "next/navigation";
import Menu from "@/UI/Menu/Menu";
import IMenu from "@/types/IMenu";
import IUserButtons from "@/types/IUserButtons";


const Header = () => {

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
                            <Link href={"/"}><CgProfile/></Link>
                        </li>
                        <li className={s.buttons__button}>
                            <Link href={"/"}><CiHeart/></Link>
                        </li>
                        <li className={s.buttons__button}>
                            <Link href={"/cart"}><FaShoppingCart/></Link>
                        </li>
                    </ul>
                    <div className={s.menu__button} onClick={() => setIsActive(!isActive)}>
                        <RiMenuFoldLine/>
                    </div>
                    <Menu active={isActive} setActive={setIsActive} pathname={pathname} pages={pages} userButtons={userButtons}/>
                </div>
            </div>
        </section>
    );
};

export default Header;