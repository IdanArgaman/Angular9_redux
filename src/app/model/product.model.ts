export class IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    creationDate: Date;
}

export interface IProductState {
    products: IProduct[];
    selectedProduct: IProduct;
    filter:string;
}
