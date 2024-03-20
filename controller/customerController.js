const Customer = require('../models/Customers')

const createCustomer = async (req, res) => {
    const customer = req.body;
    try {
        const newCustomer = await Customer.createCustomer(customer)
        res.status(200).json(newCustomer);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al registrar al cliente ' });
    }
}


const getAll = async (req, res) => {
    try {
        const allCustomers = await Customer.getAll()
        res.status(200).json(allCustomers);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener los clientes' });
    }
}


const findOneCustomer = async (req, res) => {
    try {
        const idCustomer = req.params.id;
        const costumer = await Customer.getOneById(idCustomer);
        if (costumer.length === 0) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        } else {
            res.status(200).json(costumer[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }

}


const updateCostumer = async (req, res) => {
    try {
        const idCustomer = req.params.id;
        const bodyToUpdate = req.body;

        const updatedCustomer = await Customer.update(idCustomer, bodyToUpdate);
        res.status(200).json(updatedCustomer);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Tuvimos un error, intenta más tarde' });
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const idCustomer = req.params.id;
        await Customer.deleteCustomer(idCustomer);
        res.status(204).json();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'No se pudo completar la petición' });
    }
};

module.exports = {
    createCustomer,
    getAll,
    findOneCustomer,
    updateCostumer,
    deleteCustomer
}