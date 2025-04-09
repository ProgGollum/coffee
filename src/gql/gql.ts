import {gql} from "@apollo/client";

export const GET_PRODUCTS = gql(`
    query Products {
        products(channel: "default-channel", first: 6) {
            totalCount
            edges {
                node {
                    id
                    name
                    slug
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
                    description
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