import { Request, Response } from 'express';
import { productService } from './product.service';
import { productSchema } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { products: productData } = req.body;
    const parsedData = productSchema.parse(productData);

    const result = await productService.createNewProduct(parsedData);
    res.status(201).json({
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

// const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const result = await productService.retriveALLProduct();
//     res.status(200).json({
//       success: true,
//       message: 'Product fetched successfully!',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch products',
//       error: err,
//     });
//   }
// };

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    const result = await productService.retrieveAllProducts(searchTerm);
    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Searched item not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: err.message,
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    const updatedProduct = await productService.updateProductInfo(
      productId,
      productData,
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product.',
      error: err.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const wasDeleted = await productService.deleteProduct(productId);
  if (!wasDeleted) {
    return res.status(404).json({
      success: false,
      message: 'Product not found.!',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully!',
  });
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
