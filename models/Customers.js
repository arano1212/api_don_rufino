const freezer = require('../config');

const createCustomer = (bodyCustomer) => {
    return freezer
        .insert(bodyCustomer)
        .into('customers')
        .returning('*')
}


const getAll = () => {
    return freezer
        .select('*').
        from('customers')
        .where({ active: true })

}

const getOneById = (idCustomer) => {
    return freezer
        .select('*')
        .from('customers')
        .where({ customer_id: idCustomer, active: true });

}

const update = (idCustomer, bodyToUpdate) => {
    return freezer
        .update(bodyToUpdate)
        .from('customers')
        .where({ customer_id: idCustomer, active: true })
        .returning(['customer_id', 'first_name', 'last_name', 'phone', 'address', 'postal_code', 'neighborhood', 'city', 'active']);
}

const deleteCustomer = async (idCustomer) => {
    try {
        await freezer
            .update({ active: false })
            .from('customers')
            .where({ customer_id: idCustomer });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const getCustomersByCity = () => {
    return freezer
        .select('*')
        .from('customers')
        .where({ city: 'monterrey', active: true });
};

const getCustomersWithoutSalesModel = () => {
    return freezer
        .select('customer_id', 'first_name', 'last_name')
        .from('customers')
        .whereNotExists(function() {
            this.select('customer_id')
                .from('sales')
                .whereRaw('sales.customer_id = customers.customer_id')
                .andWhere('active', true);
        });
};




module.exports = {
    createCustomer,
    getAll,
    getOneById,
    update,
    deleteCustomer,
    getCustomersByCity,
    getCustomersWithoutSalesModel,
    
}