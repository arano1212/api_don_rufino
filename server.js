const express = require('express');
const freezer = require('./config.js');

const namekusei = express();

namekusei.use(express.urlencoded({ extended: true }));
namekusei.use(express.json());

namekusei.get('/', (req, res) => {
    res.send('comienza la batalla');
});

//get all customers
namekusei.get('/api/customers', async (req, res) => {
    try {
        const allCustomers = await freezer.select('*').from('customers')
            .where({ active: true })
        res.status(200).json(allCustomers);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener los clientes' });
    }
});


//customer one by id 
namekusei.get('/api/customers/:id', async (req, res) => {
    try {
        const idCustomer = req.params.id;
        const customer = await freezer
            .select('*')
            .from('customers')
            .where({ customer_id: idCustomer, active: true });

        if (customer.length === 0) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        } else {
            res.status(200).json(customer[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se puede realizar la operación solicitada' });
    }
});



//crear un customer
namekusei.post('/api/customers', async (req, res) => {
    try {
        const customer = req.body;
        const newCustomer = await freezer
            .insert(customer)
            .into('customers')
            .returning(['customer_id', 'first_name', 'last_name', 'phone', 'address', 'postal_code', 'neighborhood', 'city', 'active']);
        res.status(201).json(newCustomer);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error al registrar al cliente' });
    }
});


//update customer
namekusei.put('/api/customers/:id', async (req, res) => {
    try {
        const idCustomer = req.params.id;
        const bodyToUpdate = req.body;
        const updateCustomer = await freezer
            .update(bodyToUpdate)
            .from('customers')
            .where({ customer_id: idCustomer, active: true })
            .returning(['customer_id', 'first_name', 'last_name', 'phone', 'address', 'postal_code', 'neighborhood', 'city', 'active']);
        res.status(200).json(updateCustomer)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: ' error al actualizar al cliente' })

    }
});


//logic delete
namekusei.delete('/api/customers/:id', async (req, res) => {
    try {
        const idCustomer = req.params.id
        await freezer
            .update({ active: false })
            .from('customers')
            .where({ customer_id: idCustomer })
        res.status(204).json()
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'no pudimos concretar la peticion' })

    }
});


//create products
namekusei.post('/api/products', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await freezer
            .insert(product)
            .into('products')
            .returning(['product_id','product_name', 'description', 'price', 'sku', 'active']);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error al registrar al producto' });
    }
});

//get all products 
namekusei.get('/api/products', async (req, res) => {
    try {
        const allProducts = await freezer.select('*').from('products')
            .where({ active: true })
        res.status(200).json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener los productos' });
    }
});

//costumer one by id
namekusei.get('/api/products/:id', async (req, res) => {
    try {
        const idProduct = req.params.id;
        const product = await freezer
            .select('*')
            .from('products')
            .where({ product_id: idProduct, active: true });

        if (product.length === 0) {
            res.status(404).json({ message: 'producto  no encontrado' });
        } else {
            res.status(200).json(product[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se puede realizar la operación solicitada' });
    }
});

//update product
namekusei.put('/api/products/:id', async (req, res) => {
    try {
        const idProduct = req.params.id;
        const bodyToUpdate = req.body;
        const updateProduct = await freezer
            .update(bodyToUpdate)
            .from('products')
            .where({ product_id: idProduct, active: true })
            .returning(['product_id','product_name','description', 'price', 'sku', 'active']);
        res.status(200).json(updateProduct)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: ' error al actualizar al cliente' })

    }
});

//logic delete products
namekusei.delete('/api/products/:id', async (req, res) => {
    try {
        const idProduct = req.params.id
        await freezer
            .update({ active: false })
            .from('products')
            .where({ product_id: idProduct })
        res.status(204).json()
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'no pudimos concretar la peticion' })

    }
});




namekusei.listen(3000, () => {
    console.log('kayoken x20');
    console.log('comienza la batalla');
})
