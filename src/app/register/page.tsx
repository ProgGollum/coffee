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
    const router = useRouter()

    const [accountRegister, {data, loading, error}] = useMutation(ACCOUNT_REGISTER);

    if (loading) return "Submitting";
    if (error) return `Submission error! ${error.message}`;

    return (
        <main>
            <section className={s.register}>
                <div className="container">
                    <div className={s.register__wrapper}>
                        <h2 className={s.register__title}>Sign Up</h2>
                        <form className={s.register__form} onSubmit={e => {
                            e.preventDefault();
                            accountRegister({
                                variables: {
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    password: password
                                }
                            });
                            router.push("/login")
                        }}>
                            <div className={s.register__form_inputs}>
                                <Input.Wrapper label={"First Name"} withAsterisk>
                                    <Input rightSection={<CgProfile size={"1rem"}/>}
                                           placeholder={"Enter your First Name"}/>
                                </Input.Wrapper>
                                <Input.Wrapper label={"Last Name"} withAsterisk>
                                    <Input rightSection={<CgProfile size={"1rem"}/>}
                                           placeholder={"Enter your Last Name"}/>
                                </Input.Wrapper>
                                <Input.Wrapper label={"Email"} withAsterisk>
                                    <Input rightSection={<CgProfile size={"1rem"}/>} placeholder={"Enter your Email"}/>
                                </Input.Wrapper>
                                <PasswordInput label={"Password"} withAsterisk placeholder={"Enter your Password"}/>
                            </div>
                            <Buttons type={"submit"} isBig={true} text={"Create Account"}/>
                        </form>
                        <p className={s.login__link}>Already have an account? <Link href={"/login"}>Sign in</Link></p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;