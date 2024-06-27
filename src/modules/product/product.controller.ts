import { NextFunction, Request, Response } from 'express';
import { productService } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productData = req.body;
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await productService.createNewProduct(zodParsedData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Failed to create product.!',
    //   error: err,
    // });
    next({ message: 'Failed to create product.!', err });
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

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    const result = await productService.retrieveAllProducts(searchTerm);
    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Searched item not found',
      });
      return;
    }
    const succesMessage = searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : 'Product fetched successfully';

    res.status(200).json({
      success: true,
      message: succesMessage,
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Failed to fetch products',
    //   error: err,
    // });
    next({ message: 'Failed to fetch products', err });
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await productService.retriveProductByID(
      req.params.productId,
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: product,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Product not found',
    //   error: error,
    // });
    next({ message: 'Product not found.!', err });
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Failed to update product.',
    //   error: err,
    // });
    next({ message: 'Failed to update product.', err });
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    const wasDeleted = await productService.deleteProduct(productId);
    if (!wasDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
    });
  } catch (err ) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Failed to delete product.',
    //   error: error,
    // });
    next({ message: 'Failed to delete product.!', err });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
