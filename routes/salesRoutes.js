const express = require('express');
const router = express.Router();
const saleController = require('../controller/salesController');

router.post('/api/sales', saleController.createSaleController);
router.get('/api/sales', saleController.getAllSalesController)
router.put('/api/sales/:id', saleController.updateSaleController);
router.get ('/api/sales/:id', saleController.getOneSaleIdController);
router.delete('/api/sales/:id', saleController.deleteSaleController)

module.exports = router;