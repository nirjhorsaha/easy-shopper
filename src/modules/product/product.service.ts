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


// Retrieve a List of All Products
const retrieveAllProducts = async (searchTerm?: string) => {
  try {
    const query = searchTerm
      ? { name: new RegExp(searchTerm, 'i') } // Using a case-insensitive regular expression to match the search term
      : {};
    const result = await Product.find(query);
    return result;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw new Error('Failed to retrieve products');
  }
};


// Update Product Information
const updateProductInfo = async (
    productId: string,
    productData: Partial<TProduct>,
  ) => {
    const result = await Product.findByIdAndUpdate(productId, productData, {
      new: true,
    });
    return result;
  };
  
  // Delete a Product
  const deleteProduct = async (productId: string) => {
    const result = await Product.deleteOne({ _id: productId });
    return result.deletedCount > 0;
  };
  
export const productService = {
  createNewProduct,
  retriveALLProduct,
  retriveProductByID,
  updateProductInfo,
  deleteProduct,
  retrieveAllProducts,
};
