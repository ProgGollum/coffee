'use client'

import React, {useState} from 'react';
import Buttons from "@/UI/Buttons/Buttons";
import {useMutation} from "@apollo/client";
import {TOKEN_CREATE} from "@/gql/gql";
import {useRouter} from "next/navigation";
import { useAuth } from '@/context/AuthContext';

interface ITokenCreate {
    tokenCreate: {
        token: string,
        refreshToken: string
    }
}

const Page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
    const auth = useAuth()

    const [tokenCreate, {loading, error, data}] = useMutation<ITokenCreate>(TOKEN_CREATE, {
        onCompleted: (data) => {
            console.log(data.tokenCreate.token);
            auth?.login(data.tokenCreate.token)
        }
    });

    if (loading) return "...Loading";
    if (error) return `Error: ${error.message}`;

    return (
        <main>
            <form onSubmit={e => {
                e.preventDefault();
                tokenCreate({variables: {email: email, password: password}});
            }}>
                <input
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={"Enter your email"}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={"Enter your password"}
                />
                <Buttons text={"Log In"} type={"submit"}/>
            </form>
        </main>
    );
};

export default Page;