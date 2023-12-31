import { CategoryEnum } from "./categoryEnum";

export interface Product {
  id: number;
  name: string;
  category: CategoryEnum;
  price: number;
  imgsrc: string;
  productAmount: number;
}