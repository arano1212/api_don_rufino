const zarbon = require('../config');

const createSalesModel = (bodySale) => {
    return zarbon
        .insert(bodySale)
        .into('sales')
        .returning('*');
}

const allSalesModel = () => {
    return zarbon
        .select('*')
        .from('sales')
        .where({ active: true })
}


const updateSaleModel = (idSale, bodyToUpdate) => {
    return zarbon
        .update(bodyToUpdate)
        .from('sales')
        .where({ sale_id: idSale, active: true })
        .returning('*');

}

const oneSalebyIdModel = (idSale) => {
    return zarbon
        .select('*')
        .from('sales')
        .where({ sale_id: idSale, active: true });
}


const deleteSaleModel = async (idSale) => {
    try {
        await zarbon
            .update({ active: false })
            .from('sales')
            .where({ sale_id: idSale });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


module.exports = {
    createSalesModel,
    allSalesModel,
    updateSaleModel,
    oneSalebyIdModel,
    deleteSaleModel
}