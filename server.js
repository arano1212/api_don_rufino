const express = require('express');

const customerRoutes= require('./routes/customerRoutes');
const productRoutes = require('./routes/productsRoutes');
const saleRoutes = require('./routes/salesRoutes');

const namekusei = express()

namekusei.use(express.urlencoded({ extended: true }));
namekusei.use(express.json());

namekusei.get('/', (req, res) => {
    res.send('comienza la batalla');
});



namekusei.use(customerRoutes);
namekusei.use(productRoutes);
namekusei.use(saleRoutes);

namekusei.listen(3000, () => {
    console.log('kayoken x20');
    console.log('comienza la batalla');
})
