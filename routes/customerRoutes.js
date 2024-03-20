const express = require('express');
const router = express.Router();

const CustomerController = require('../controller/customerController');

router.post('/api/customers', CustomerController.createCustomer);
router.get('/api/customers', CustomerController.getAll);
router.get('/api/customers/:id', CustomerController.findOneCustomer);
router.put('/api/customers/:id', CustomerController.updateCostumer);
router.delete('/api/customers/:id', CustomerController.deleteCustomer)
router.get('/api/customers/city/monterrey', CustomerController.getCustomersInMonterrey)





module.exports = router;