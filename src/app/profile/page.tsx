'use client'

import React from 'react';
import {useQuery} from "@apollo/client";
import {ME_QUERY} from "@/gql/gql";

const Page = () => {
    const {loading, error, data} = useQuery(ME_QUERY);

    // {
    //         context: {
    //             headers: {
    //                 'x-include-token': true,
    //             },
    //         },
    //     }

    if (loading) return <p>...Loading</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h1>Me</h1>
            <p>Email: {data.me.email}</p>
            <p>First name: {data.me.firstName}</p>
            <p>Last name: {data.me.lastName}</p>
        </div>
    );
};

export default Page;