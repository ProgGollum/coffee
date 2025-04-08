import React, {FC} from 'react';
import IMenu from "@/types/IMenu";
import s from "./Menu.module.scss"
import classNames from "classnames";
import Link from "next/link";
import IUserButtons from "@/types/IUserButtons";


interface MenuProps {
    pages: IMenu[],
    userButtons: IUserButtons[],
    pathname: string,
    active: boolean,
    setActive: (value: boolean) => void
}

const Menu: FC<MenuProps> = ({pages, userButtons, pathname, active, setActive}) => {
    return (
        <div onClick={() => setActive(false)} className={classNames(s.menu, active ? s.active : {})}>
            <div className={s.menu__content} onClick={e => e.stopPropagation()}>
                <ul className={s.menu__list}>
                    {pages.map(page => (
                        <li key={page.id} className={s.menu__item}>
                            <Link
                                href={page.href}
                                className={classNames(s.menu__item_link, pathname === page.href ? s.active_link : {})}
                            >
                                {page.value}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className={s.user__buttons}>
                    {userButtons.map(button => (
                        <div key={button.id} className={s.button}>
                            <Link href={button.href} className={s.button__link}>
                                {button.icon}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;