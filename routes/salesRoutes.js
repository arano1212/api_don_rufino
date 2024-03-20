const express = require('express');
const router = express.Router();
const saleController = require('../controller/salesController');

router.post('/api/sales', saleController.createSaleController);
router.get('/api/sales', saleController.getAllSalesController)
router.put('/api/sales/:id', saleController.updateSaleController);
router.get ('/api/sales/:id', saleController.getOneSaleIdController);
router.delete('/api/sales/:id', saleController.deleteSaleController);
router.get('/api/sales/quantity/:maxQuantity', saleController.getProductMoreTenController);
router.get('/api/sales/customers/all', saleController.getCustomersWhoBoughtAllProductsController);
router.get('/api/sales/all/quantity', saleController.getTotalQuantityByCustomerController);
router.get('/api/sales/products/customers/guadalajara', saleController.getProductsNotBoughtByGuadalajaraCustomersController);
router.get('/api/sales/products/city/monterrey-cancun', saleController.getProductsSoldToMonterreyAndCancunCustomersController);
router.get('/api/sales/products/city/all', saleController.getCitiesWhereAllProductsSoldController);



module.exports = router;