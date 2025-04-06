import React, {FC} from 'react';
import s from "./Buttons.module.scss"
import classNames from "classnames";

interface ButtonProps {
    text: string,
    isTransparent?: boolean,
    width?: string
}

const Buttons:FC<ButtonProps> = ({text, isTransparent, width}) => {
    return (
        <button style={width ? {width: width} : {}} className={classNames(s.button, isTransparent ? s.transparent_button : {})}>
            {text}
        </button>
    );
};

export default Buttons;