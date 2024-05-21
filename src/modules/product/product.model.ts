import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, 'Variant type is required'],
  },
  value: {
    type: String,
    required: [true, 'Variant value is required'],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'In-stock status is required'], 
  },
});

// Define the TProduct schema
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'], 
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Product Price must be a positive number'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required'],
    validate: {
      validator: Array.isArray,
      message: 'Tags must be an array of strings',
    },
  },
  variants: {
    type: [variantSchema],
    required: [true, 'Product variants are required'],
    validate: {
      validator: Array.isArray,
      message: 'Variants must be an array of objects',
    },
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Product inventory is required'],
  },
});

export const Product = model<TProduct>('Product', productSchema);
