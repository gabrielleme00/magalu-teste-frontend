const fetch = require('node-fetch');

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const views = {
    products: path.join(__dirname, '/public/html/products.html')
};

const productsAPI = "https://run.mocky.io/v3/";
const productsEndpoint = "66063904-d43c-49ed-9329-d69ad44b885e";
const productsURL = productsAPI + productsEndpoint;

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(views.products);
});

app.get('/wishlist', (req, res) => {
    res.sendFile(views.products);
});

app.get('/products', (req, res) => {
    fetch(productsURL)
        .then(res => res.json())
        .then(json => res.json(json));
});

app.listen(port, () => {
    console.log(`Up and running @ http://localhost:${port}`);
});
