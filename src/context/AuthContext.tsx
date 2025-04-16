'use client'

import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

type AuthContextType = {
    isAuth: boolean;
    loading: boolean;
    login: (token: string) => void;
    check: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider:FC<{children: ReactNode}> = ({children}) => {
    const [token, setToken] = useState("");
    const [isAuth, setIsAuth] = useState(false)
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentToken = localStorage.getItem("token")
        if (currentToken) {
            setIsAuth(true)
        }
        setLoading(false);
    }, [token]);

    const login = (token: string) => {
        setToken(token);
        if (token) {
            router.push("/")
            setIsAuth(true)
        }
    }

    const check = () => {
        if (localStorage.getItem("token")) {
            setIsAuth(true);
            return true;
        }
        return false
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setIsAuth(false)
    }

    useEffect(() => {
        if(token) {
            localStorage.setItem("token", token)
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{login, check, logout, isAuth, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);
    return value;
}