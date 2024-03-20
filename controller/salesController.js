const Sale = require('../models/Sales');

const createSaleController = async (req,res)=>{
    try {
        const sale = req.body;
        const newSales = await Sale.createSalesModel(sale)
        res.status(201).json(newSales);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error al registrar la venta' });
    }

}


const getAllSalesController = async (req,res)=>{
    try {
        const allSales = await Sale.allSalesModel()
        res.status(200).json(allSales);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener la ventas' });
    }
}

const updateSaleController = async (req,res)=>{
    try {
        const idSale = req.params.id;
        const bodyToUpdate = req.body;
        const updateSale = await Sale.updateSaleModel(idSale, bodyToUpdate)
        res.status(200).json(updateSale)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: ' error al actualizar la venta' })

    }
}

const getOneSaleIdController = async (req,res) =>{
    try {
        const idSale = req.params.id;
        const sale = await Sale.oneSalebyIdModel(idSale)

        if (sale.length === 0) {
            res.status(404).json({ message: 'venta  no encontrado' });
        } else {
            res.status(200).json(sale[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'No se puede realizar la operación solicitada' });
    }
}

const deleteSaleController= async (req, res) => {
    try {
        const idSale = req.params.id;
        await Sale.deleteSaleModel(idSale);
        res.status(204).json();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'No se pudo completar la petición' });
    }
};

const getProductMoreTenController = async (req, res) => {
    const maxQuantity = req.params.maxQuantity; 
    const products = await Sale.getSalesOverTenUnitsModel(maxQuantity); 
    res.json(products);
};

const getCustomersWhoBoughtAllProductsController = async (req, res) => {
    try {
        const customersWhoBoughtAllProducts = await Sale.getCustomersWhoBoughtAllProductsModel();
        res.json(customersWhoBoughtAllProducts);
    } catch (error) {
        console.error('Error al obtener clientes que han comprado todos los productos:', error);
        res.status(500).json({ error: 'Error al obtener clientes que han comprado todos los productos' });
    }
};

const getTotalQuantityByCustomerController = async (req, res) => {
    try {
        const totalQuantityByCustomer = await Sale.getTotalQuantityByCustomerModel();
        res.json(totalQuantityByCustomer);
    } catch (error) {
        console.error('Error al obtener la suma total de la cantidad de productos por cliente:', error);
        res.status(500).json({ error: 'Error al obtener la suma total de la cantidad de productos por cliente' });
    }
};


const getProductsNotBoughtByGuadalajaraCustomersController = async (req, res) => {
    try {
        const productsNotBought = await Sale.getProductsNotBoughtByGuadalajaraCustomersModel();
        res.json(productsNotBought);
    } catch (error) {
        console.error('Error al obtener los productos no comprados por clientes de Guadalajara:', error);
        res.status(500).json({ error: 'Error al obtener los productos no comprados por clientes de Guadalajara' });
    }
};

const getProductsSoldToMonterreyAndCancunCustomersController = async (req, res) => {
    try {
        const productsSoldToMonterreyAndCancun = await Sale.getProductsSoldToMonterreyAndCancunCustomersModel();
        res.json(productsSoldToMonterreyAndCancun);
    } catch (error) {
        console.error('Error al obtener los productos vendidos a clientes de Monterrey y Cancún:', error);
        res.status(500).json({ error: 'Error al obtener los productos vendidos a clientes de Monterrey y Cancún' });
    }
};

const getCitiesWhereAllProductsSoldController = async (req, res) => {
    try {
        const citiesWhereAllProductsSold = await Sale.getCitiesWhereAllProductsSoldModel();
        res.json(citiesWhereAllProductsSold);
    } catch (error) {
        console.error('Error al obtener las ciudades donde se han vendido todos los productos:', error);
        res.status(500).json({ error: 'Error al obtener las ciudades donde se han vendido todos los productos' });
    }
};



module.exports={
    createSaleController,
    getAllSalesController,
    updateSaleController,
    getOneSaleIdController,
    deleteSaleController,
    getProductMoreTenController,
    getCustomersWhoBoughtAllProductsController,
    getTotalQuantityByCustomerController,
    getProductsNotBoughtByGuadalajaraCustomersController,
    getProductsSoldToMonterreyAndCancunCustomersController,
    getCitiesWhereAllProductsSoldController
}