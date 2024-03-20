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

module.exports={
    createSaleController,
    getAllSalesController,
    updateSaleController,
    getOneSaleIdController,
    deleteSaleController
}