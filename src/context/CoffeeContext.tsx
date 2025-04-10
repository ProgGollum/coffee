'use client'

import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";

interface IProduct {
    id: string;
    name: string;
    slug: string;
    thumbnail: {
        url: string;
        alt: string;
    };
    pricing: {
        priceRange: {
            start: {
                gross: {
                    currency: string;
                    amount: number;
                };
            };
        };
    };
    description: string;
    size: string;
}

interface CartContextType {
    cartItems: IProduct[] | null,
    addToCart: (product: IProduct) => void,
    removeFromCart: (id: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider:FC<{children: ReactNode}> = ({children}) => {
    const [cartItems, setCartItems] = useState<IProduct[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    })

    const addToCart = (product: IProduct) => {
        setCartItems((prev) => {
            const updatedItems = [...prev, product];
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    }

    const removeFromCart = (id: string) => {
        setCartItems((prev) => {
            const updatedItems = prev.filter(item => item.id !== id);
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    }

    useEffect(() => {
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