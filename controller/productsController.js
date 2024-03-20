const Product = require('../models/Products')

const createProductController = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await Product.createProductModel(product)
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error al registrar al producto' });
    }
}

const getAllProductsController = async (req, res) => {
    try {
        const allProducts = await Product.getAllProductsModel();
        res.status(200).json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error' });
    }
};

const findOneProductController = async (req, res) => {
    try {
        const idProduct = req.params.id;
        const product = await Product.getOneProductIdModel(idProduct);
        if (product.length === 0) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        } else {
            res.status(200).json(product[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }

}

const updateProductController = async (req, res) => {
    try {
        const idProduct = req.params.id;
        const bodyToUpdate = req.body;
        const updateProduct = await Product.updateModel(idProduct, bodyToUpdate)
        res.status(200).json(updateProduct)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: ' error al actualizar al cliente' })

    }


}


const deleteProductController= async (req, res) => {
    try {
        const idProduct = req.params.id;
        await Product.deleteProductModel(idProduct);
        res.status(204).json();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'No se pudo completar la petición' });
    }
};

module.exports = {
    getAllProductsController,
    createProductController,
    findOneProductController,
    updateProductController,
    deleteProductController

}