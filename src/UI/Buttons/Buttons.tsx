import React, {FC} from 'react';
import s from "./Buttons.module.scss"
import classNames from "classnames";

interface ButtonProps {
    text: string,
    isTransparent?: boolean,
    isBig?: boolean,
    onClick?: () => void
}

const Buttons:FC<ButtonProps> = ({text, isTransparent, isBig, onClick}) => {
    return (
        <button onClick={onClick} className={classNames(s.button, isTransparent ? s.transparent_button : {}, isBig ? s.big__button : {})}>
            {text}
        </button>
    );
};

export default Buttons;