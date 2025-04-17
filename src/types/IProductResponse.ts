import {IProduct} from "@/types/IProduct";

export interface IProductsResponse {
    category: {
        id: string;
        name: string;
        products: {
            edges: Array<{
                node: IProduct;
            }>;
        };
    }
}