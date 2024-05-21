import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createNewProduct = async (product: TProduct) => { 
    const result = await Product.create(product);
    return result;
}

const retriveALLProduct = async () => { 
    const result = await Product.find();
    return result;
}


export const productService = {
    createNewProduct,
    retriveALLProduct,

}