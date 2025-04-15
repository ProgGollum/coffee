'use client'

import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

type AuthContextType = {
    login: (token: string) => void;
}

interface IUser {
    id: string,
    email: string,
    firstName: string,
    lastName: string
}

interface IToken {
    token: string,
    refreshToken: string,
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider:FC<{children: ReactNode}> = ({children}) => {
    const [token, setToken] = useState("");
    const router = useRouter();

    const login = (token: string) => {
            setToken(token);
            router.push("/")
    }

    useEffect(() => {
        if(token) {
            localStorage.setItem("token", token)
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);
    return value;
}