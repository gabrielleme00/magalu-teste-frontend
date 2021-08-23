const fetch = require('node-fetch');

const productsEndpoint = "66063904-d43c-49ed-9329-d69ad44b885e";
const productsURL = process.env.PRODUCTS_API_URL + productsEndpoint;

const productsController = {
    getAll: (req, res) => {
        fetch(productsURL)
            .then(res => res.json())
            .then(json => res.json(json));
    },
    getBySearch: (req, res) => {
        const search = req.params.search.toLowerCase().trim();
        if (!search) res.redirect('/products/');

        fetch(productsURL)
            .then(res => res.json())
            .then(json => {
                json.products = json.products.filter(product => {
                    return product.title.toLowerCase().includes(search);
                });
                res.json(json);
            });
    }
};

module.exports = productsController;
