require('dotenv').config();

const fetch = require('node-fetch');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

const views = {
    products: path.join(__dirname, '/public/html/products.html')
};

const productsEndpoint = "66063904-d43c-49ed-9329-d69ad44b885e";
const productsURL = process.env.PRODUCTS_API_URL + productsEndpoint;

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(views.products);
});

app.get('/wishlist', (req, res) => {
    res.sendFile(views.products);
});

app.get('/api/products', (req, res) => {
    fetch(productsURL)
        .then(res => res.json())
        .then(json => res.json(json));
});

app.get('/api/products/:search', (req, res) => {
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
});

app.get('/api/products/wishlist/:userId', (req, res) => {
    fetch(productsURL)
        .then(res => res.json())
        .then(json => res.json(json));
});

app.listen(port, () => {
    console.log(`Up and running @ http://localhost:${port}`);
});
