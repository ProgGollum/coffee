'use client'

import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {ACCOUNT_REGISTER} from "@/gql/gql";
import {useRouter} from "next/navigation";
import Link from 'next/link';
import s from "./page.module.scss"
import {Input, PasswordInput} from '@mantine/core';
import {CgProfile} from "react-icons/cg";
import Buttons from '@/UI/Buttons/Buttons';

const Page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter()

    const [accountRegister, {data, loading, error}] = useMutation(ACCOUNT_REGISTER, {
        onCompleted: (data) => {
            if (data.accountRegister.errors && data.accountRegister.errors.length > 0) {
                // Обрабатываем ошибки из ответа
                const emailError = data.accountRegister.errors.find(
                    (error: any) => error.field === 'email' && error.code === 'UNIQUE'
                );

                if (emailError) {
                    setErrorMessage("Пользователь с таким email уже существует");
                } else {
                    // Другие ошибки
                    setErrorMessage(data.accountRegister.errors[0].message);
                }
            } else {
                // Успешная регистрация
                router.push("/login");
            }
        },
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });

    if (loading) return "Submitting";

    return (
        <main>
            <section className={s.register}>
                <div className="container">
                    <div className={s.register__wrapper}>
                        <h2 className={s.register__title}>Sign Up</h2>
                        <form className={s.register__form} onSubmit={e => {
                            e.preventDefault();
                            setErrorMessage(null)
                            accountRegister({
                                variables: {
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    password: password
                                }
                            });
                        }}>
                            <div className={s.register__form_inputs}>
                                <Input.Wrapper label={"First Name"} withAsterisk>
                                    <Input
                                        rightSection={<CgProfile size={"1rem"}/>}
                                        placeholder={"Enter your First Name"}
                                        value={firstName}
                                        onChange={event => setFirstName(event.target.value)}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label={"Last Name"} withAsterisk>
                                    <Input
                                        rightSection={<CgProfile size={"1rem"}/>}
                                        placeholder={"Enter your Last Name"}
                                        value={lastName}
                                        onChange={event => setLastName(event.target.value)}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label={"Email"} withAsterisk>
                                    <Input
                                        rightSection={<CgProfile size={"1rem"}/>}
                                        placeholder={"Enter your Email"}
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                </Input.Wrapper>
                                <PasswordInput
                                    label={"Password"}
                                    withAsterisk
                                    placeholder={"Enter your Password"}
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <Buttons type={"submit"} isBig={true} text={"Create Account"}/>
                        </form>
                        <p className={s.login__link}>Already have an account? <Link href={"/login"}>Sign in</Link></p>

                        {errorMessage && (
                            <div>
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;