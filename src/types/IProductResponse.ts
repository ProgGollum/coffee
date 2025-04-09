import {IProduct} from "@/types/IProduct";

export interface IProductsResponse {
    products: {
        totalCount: number;
        edges: Array<{
            node: IProduct;
        }>;
    };
}