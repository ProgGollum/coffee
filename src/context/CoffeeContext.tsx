'use client'

import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";

interface Coffee {
    id: number,
    image: string,
    title: string,
    size: string,
    price: number
}

interface CartContextType {
    cartItems: Coffee[] | null,
    addToCart: (coffee: Coffee) => void,
    removeFromCart: (id: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider:FC<{children: ReactNode}> = ({children}) => {
    const [cartItems, setCartItems] = useState<Coffee[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    })

    const addToCart = (coffee: Coffee) => {
        setCartItems((prev) => {
            const updatedItems = [...prev, coffee];
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            }
            return updatedItems;
        });
    }

    const removeFromCart = (id: number) => {
        setCartItems((prev) => {
            const updatedItems = prev.filter(item => item.id !== id);
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            }
            return updatedItems;
        });
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleStorageChange = () => {
                const savedCart = localStorage.getItem('cartItems');
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
            };

            window.addEventListener('storage', handleStorageChange);

            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }
    }, []);

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};