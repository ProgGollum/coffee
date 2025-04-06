'use client'

import React, {useEffect, useState} from 'react';
import s from "./Header.module.scss"
import Link from "next/link";

import Image from "next/image";
import logo from "../../../../public/logo.svg";
import { CgProfile } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";

import classNames from "classnames";
import {usePathname} from "next/navigation";


const Header = () => {
    const pathname = usePathname();

    return (
        <section className={s.header}>
            <div className="container">
                <div className={s.header__wrapper}>
                    <nav className={s.nav}>
                        <ul className={s.nav__list}>
                            <li className={s.nav__item}>
                                <Link href={"/"} className={classNames(s.nav__item_link, pathname === "/" ? s.active : {})}>Home</Link>
                            </li>
                            <li className={s.nav__item}>
                                <Link href={"/about"} className={classNames(s.nav__item_link, pathname === "/about" ? s.active : {})}>About</Link>
                            </li>
                            <li className={s.nav__item}>
                                <Link href={"/menu"} className={classNames(s.nav__item_link, pathname === "/menu" ? s.active : {})}>Menu</Link>
                            </li>
                            <li className={s.nav__item}>
                                <Link href={"/reservation"} className={classNames(s.nav__item_link, pathname === "/reservation" ? s.active : {})}>Reservation</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={s.logo}>
                        <Link href={"/"}><Image src={logo} alt="Logo"/></Link>
                    </div>
                    <div>
                        <ul className={s.buttons}>
                            <li className={s.buttons__button}>
                                <Link href={"/"}><CgProfile/></Link>
                            </li>
                            <li className={s.buttons__button}>
                                <Link href={"/"}><CiHeart/></Link>
                            </li>
                            <li className={s.buttons__button}>
                                <Link href={"/"}><FaShoppingCart/></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;