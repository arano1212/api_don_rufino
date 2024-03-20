const express = require('express');
const router = express.Router();
const productController = require('../controller/productsController');


router.post('/api/products', productController.createProductController);
router.get('/api/products', productController.getAllProductsController);
router.get('/api/products/:id', productController.findOneProductController);
router.put('/api/products/:id', productController.updateProductController);
router.delete('/api/products/:id', productController.deleteProductController);
router.get('/api/products/price/:maxPrice', productController.getProductsUnderMaxPriceController);

module.exports = router;  
