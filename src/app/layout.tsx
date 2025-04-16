"use client"

import '@mantine/core/styles.css';
import "../styles/globals.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {ColorSchemeScript, mantineHtmlProps, MantineProvider} from "@mantine/core";
import {theme} from "@/styles/theme";
import {CartProvider} from "@/context/CoffeeContext";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {AuthProvider} from "@/context/AuthContext";
import {setContext} from "@apollo/client/link/context";

const httpLink = new HttpLink({
    uri: 'https://store-risf0ubl.eu.saleor.cloud/graphql/'
})

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem("token");
    // const shouldAddToken = headers && headers['x-include-token'];

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
})

// shouldAddToken &&

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

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
