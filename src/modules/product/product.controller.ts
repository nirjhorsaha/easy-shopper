import { Request, Response } from 'express';
import { productService } from './product.service';
import { productSchema } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { products: productData } = req.body;
    const parsedData = productSchema.parse(productData);

    const result = await productService.createNewProduct(parsedData);
    res.json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product.!',
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.retriveALLProduct();
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: err,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const product = await productService.retriveProductByID(req.params.productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }
  try {
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
};
