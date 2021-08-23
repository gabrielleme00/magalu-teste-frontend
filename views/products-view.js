const path = require('path');

const pages = {
    products: path.join(__dirname, '../public/html/products.html')
};

const views = {
    getProducts: (req, res) => res.sendFile(pages.products),
    getWishlist: (req, res) => res.sendFile(pages.products)
};

module.exports = views;
