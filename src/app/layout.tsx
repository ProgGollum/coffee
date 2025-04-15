"use client"

import '@mantine/core/styles.css';
import "../styles/globals.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {ColorSchemeScript, mantineHtmlProps, MantineProvider} from "@mantine/core";
import {theme} from "@/styles/theme";
import {CartProvider} from "@/context/CoffeeContext";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {GET_PRODUCTS} from "@/gql/gql";
import {AuthProvider} from "@/context/AuthContext";

const client = new ApolloClient({
    uri: 'https://store-risf0ubl.eu.saleor.cloud/graphql/',
    cache: new InMemoryCache(),
})

client.query({query: GET_PRODUCTS}).then((result) => console.log(result));

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript/>
                <title>Coffee</title>
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <ApolloProvider client={client}>
                        <AuthProvider>
                            <CartProvider>
                                <Header/>
                                {children}
                                <Footer/>
                            </CartProvider>
                        </AuthProvider>
                    </ApolloProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
