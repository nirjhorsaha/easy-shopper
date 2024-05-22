"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = require("./modules/product/product.routes");
const order_routes_1 = require("./modules/order/order.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api/products', product_routes_1.ProductRoutes);
app.use('/api/orders', order_routes_1.OrderRoutes);
// Not Found Route
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});
// initial response check
app.get('/', (req, res) => {
    res.send('Hello Backend Developer..!');
});
exports.default = app;
