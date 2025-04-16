'use client'

import React, {useState} from 'react';
import Buttons from "@/UI/Buttons/Buttons";
import {useMutation} from "@apollo/client";
import {TOKEN_CREATE} from "@/gql/gql";
import {useRouter} from "next/navigation";
import {useAuth} from '@/context/AuthContext';
import {Input, PasswordInput} from "@mantine/core";
import {CgProfile} from "react-icons/cg";
import Link from "next/link";
import s from "./page.module.scss"

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
    const auth = useAuth();

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
            <section className={s.login}>
                <div className="container">
                    <div className={s.login__wrapper}>
                        <h2 className={s.login__title}>Sign In</h2>
                        <form className={s.login__form} onSubmit={e => {
                            e.preventDefault();
                            tokenCreate({variables: {email: email, password: password}});
                        }}>
                            <div className={s.login__form_inputs}>
                                <Input.Wrapper label={"Email"} withAsterisk>
                                    <Input
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        rightSection={<CgProfile size={"1rem"}/>} placeholder={"Enter your Email"}
                                    />
                                </Input.Wrapper>
                                <PasswordInput
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    label={"Password"}
                                    withAsterisk
                                    placeholder={"Enter your Password"}

                                />
                            </div>
                            <Buttons type={"submit"} isBig={true} text={"Sign In"}/>
                        </form>
                        <p className={s.register__link}>You don't have an account yet? <Link href={"/register"}>Sign
                            up</Link></p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;