'use client'

import React, {useState} from 'react';
import Buttons from "@/UI/Buttons/Buttons";
import {useMutation, useQuery} from "@apollo/client";
import {ACCOUNT_REGISTER} from "@/gql/gql";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {valueOf} from "postcss-preset-mantine";
import {useRouter} from "next/navigation";

const Page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const router = useRouter()

    const [accountRegister, {data, loading, error}] = useMutation(ACCOUNT_REGISTER);

    if(loading) return "Submitting";
    if (error) return `Submission error! ${error.message}`;

    return (
        <main>
            <form onSubmit={e => {
                e.preventDefault();
                accountRegister({variables: {firstName: firstName, lastName: lastName, email: email, password: password}});
                router.push("/login")
            }}>
                <input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder={"Enter your First Name"}
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder={"Enter your Last Name"}
                />
                <input
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={"Enter your Email"}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={"Enter your Password"}
                />
                <Buttons text={"Sign In"} type={"submit"}/>
            </form>
        </main>
    );
};

export default Page;