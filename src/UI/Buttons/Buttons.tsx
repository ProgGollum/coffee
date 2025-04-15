import React, {FC} from 'react';
import s from "./Buttons.module.scss"
import classNames from "classnames";

interface ButtonProps {
    text: string,
    isTransparent?: boolean,
    isBig?: boolean,
    onClick?: () => void,
    type?: "submit" | "reset" | "button"
}

const Buttons:FC<ButtonProps> = ({text, isTransparent, isBig, onClick, type}) => {
    return (
        <button type={type} onClick={onClick} className={classNames(s.button, isTransparent ? s.transparent_button : {}, isBig ? s.big__button : {})}>
            {text}
        </button>
    );
};

export default Buttons;