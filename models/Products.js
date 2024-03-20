const dodoria = require('../config');


const createProductModel = (bodyProduct) => {
    return dodoria
        .insert(bodyProduct)
        .into('products')
        .returning('*');
}

const getAllProductsModel = () => {
    return dodoria
        .select('*')
        .from('products')
        .where({ active: true })
}

const getOneProductIdModel = (idProduct) => {
    return dodoria
        .select('*')
        .from('products')
        .where({ product_id: idProduct, active: true });

}

const updateModel =(idProduct, bodyToUpdate) =>{
    return dodoria
    .update(bodyToUpdate)
    .from('products')
    .where({ product_id: idProduct, active: true })
    .returning('*');
}


const deleteProductModel = async (idProduct) => {
    try {
        await dodoria
            .update({ active: false })
            .from('products')
            .where({ product_id: idProduct });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


module.exports = {
    getAllProductsModel,
    createProductModel,
    getOneProductIdModel,
    updateModel,
    deleteProductModel

}