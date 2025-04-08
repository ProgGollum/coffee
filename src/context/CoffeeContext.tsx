import {createContext, FC, ReactNode, useState} from "react";

interface Coffee {
    id: number,
    image: string,
    title: string,
    size: string,
    price: number
}

interface CartContextType {
    cart: Coffee[] | null,
    addToCart: (coffee: Coffee) => void,
    removeFromCart: (id: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider:FC<{children: ReactNode}> = ({children}) => {
    const [cart, setCart] = useState<Coffee[]>([])

    const addToCart = (coffee: Coffee) => {
        setCart((prev) => ([...prev, coffee]))
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((product) => product.id !== id))
    }

    return (
        <div>

        </div>
    )
}