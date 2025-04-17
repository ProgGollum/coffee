import {gql} from "@apollo/client";

export const GET_CATEGORY = gql(`
    query Category {
        category(slug: "coffee") {
            id
            name
            products(first: 6, channel: "default-channel") {
                edges {
                    node {
                        id
                        name
                        slug
                        description
                        thumbnail(size: 256) {
                            url
                            alt
                        }
                        pricing {
                            priceRange {
                                start {
                                    gross {
                                        currency
                                        amount
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`)

export const GET_PRODUCT_BY_ID = gql(`
    query Product($slug: String!) {
        product(slug: $slug, channel: "default-channel") {
            id
            name
            description
            slug
            thumbnail(size: 256) {
                url
                alt
            }
            pricing {
                priceRange {
                    start {
                        gross {
                            amount
                            currency
                        }
                    }
                }
            }
        }
    }
`)

export const ME_QUERY = gql(`
    query Me {
        me {
            id
            email
            firstName
            lastName
        }
    }
`);

export const TOKEN_REFRESH = gql(`
    mutation TokenRefresh {
        tokenRefresh {
            token
            errors {
                field
                message
            }
        }
    }
`);

//Mutations
export const ACCOUNT_REGISTER = gql(`
    mutation AccountRegister($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        accountRegister(
            input: {
                firstName: $firstName
                lastName: $lastName
                email: $email
                password: $password
                redirectUrl: "https://store-risf0ubl.eu.saleor.cloud"
                channel: "default-channel"
            }
        ) {
            user {
                id
                email
                firstName
                lastName
            }
            errors {
                field
                message
                code
                addressType
            }
        }
    }
`);

export const TOKEN_CREATE = gql(`
    mutation TokenCreate ($email: String!, $password: String!) {
        tokenCreate(email: $email, password: $password) {
            token
            refreshToken
            csrfToken
        }
    }
`);