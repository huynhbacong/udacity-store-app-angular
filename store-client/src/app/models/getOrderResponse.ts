import { Product } from "./product";
import { StatusEnum } from "./statusEnum";

export interface GetOrderResponse {
    orderId: number;
    status: StatusEnum;
    products: Product[];
}

export interface Order {
    id: number;
    userId: number;
    status: StatusEnum;
}