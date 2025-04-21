import {ReactElement} from "react";

export default interface IUserButtons {
    id: number,
    href: string,
    open?: boolean,
    icon: ReactElement
};