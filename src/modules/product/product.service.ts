import { TProduct } from './product.interface';
import { Product } from './product.model';

// Create a New Product
const createNewProduct = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

// Retrieve a List of All Products
const retriveALLProduct = async () => {
  const result = await Product.find();
  return result;
};

// Retrieve a Specific Product by ID
const retriveProductByID = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

export const productService = {
  createNewProduct,
  retriveALLProduct,
  retriveProductByID,
};
