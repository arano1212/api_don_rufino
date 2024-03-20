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

const getSalesOverTenUnitsModel = (maxQuantity) => {
    return zarbon
    .select('customers.customer_id', 'customers.first_name', 'sales.quantity', 'products.product_id')
    .from('customers')
    .join('sales', 'customers.customer_id', '=', 'sales.customer_id')
    .join('products', 'sales.product_id', '=', 'products.product_id')
    .where('sales.quantity', '>', maxQuantity);
  
};


const getCustomersWhoBoughtAllProductsModel = () => {
    return zarbon
        .select('customers.customer_id', 'customers.first_name', 'customers.last_name')
        .from('customers')
        .join('sales', 'customers.customer_id', '=', 'sales.customer_id')
        .groupBy('customers.customer_id', 'customers.first_name', 'customers.last_name')
        .havingRaw('COUNT(DISTINCT sales.product_id) = (SELECT COUNT(*) FROM products)');
};

const getTotalQuantityByCustomerModel = () => {
    return zarbon
        .select('customers.customer_id', 'customers.first_name', 'customers.last_name')
        .sum('sales.quantity as total_quantity')
        .from('customers')
        .leftJoin('sales', 'customers.customer_id', '=', 'sales.customer_id')
        .groupBy('customers.customer_id', 'customers.first_name', 'customers.last_name');
};

const getProductsNotBoughtByGuadalajaraCustomersModel = () => {
    return zarbon
    .select('products.product_id')
    .from('products')
    .leftJoin('sales', 'products.product_id', '=', 'sales.product_id')
    .leftJoin('customers', 'sales.customer_id', '=', 'customers.customer_id')
    .whereNull('sales.customer_id')
    .orWhereNot('customers.city', 'guadalajara');
};

const getProductsSoldToMonterreyAndCancunCustomersModel = () => {
    return zarbon
        .distinct('sales.product_id')
        .from('sales')
        .leftJoin('customers', 'sales.customer_id', '=', 'customers.customer_id')
        .whereIn('customers.city', ['monterrey', 'cancún'])
        .groupBy('sales.product_id')
        .havingRaw('COUNT(DISTINCT CASE WHEN customers.city = ? THEN customers.city END) = 2', ['Monterrey']);
};

const getCitiesWhereAllProductsSoldModel = () => {
    return zarbon
        .select('customers.city')
        .from('customers')
        .join('sales', 'customers.customer_id', '=', 'sales.customer_id')
        .distinct('customers.city')
        .whereIn('sales.product_id', function() {
            this.select('product_id').from('products');
        })
        .groupBy('customers.city')
        .havingRaw('COUNT(DISTINCT sales.product_id) = (SELECT COUNT(*) FROM products)');
};





module.exports = {
    createSalesModel,
    allSalesModel,
    updateSaleModel,
    oneSalebyIdModel,
    deleteSaleModel,
    getSalesOverTenUnitsModel,
    getCustomersWhoBoughtAllProductsModel,
    getTotalQuantityByCustomerModel,
    getProductsNotBoughtByGuadalajaraCustomersModel,
    getProductsSoldToMonterreyAndCancunCustomersModel,
    getCitiesWhereAllProductsSoldModel
}