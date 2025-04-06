import React from 'react';
import s from "./Footer.module.scss"

import Image from "next/image";
import logo from "../../../../public/logo.svg"

import Link from "next/link";

const Footer = () => {
    return (
        <section className={s.footer}>
            <div className="container">
                <div className={s.footer__wrapper}>
                    <Link href={"/"} className={s.logo}>
                        <Image src={logo} alt="Logo"/>
                        <span>COFFEMEET</span>
                    </Link>
                    <nav className={s.nav}>
                        <ul className={s.nav__list}>
                            <li className={s.nav__item}>
                                <Link href={"/"}>Home</Link>
                            </li>
                            <li className={s.nav__item}>
                                <Link href={"/"}>About</Link>
                            </li>
                            <li className={s.nav__item}>
                                <Link href={"/"}>Menu</Link>
                            </li>
                            <li className={s.nav__item}>
                                <Link href={"/"}>Reservation</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={s.links}>
                        <Link href={""}>Contacts</Link>
                        <Link href={""}>Privacy policy</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;