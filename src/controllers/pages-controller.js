const pages = require('../views/pages-view');

const pagesController = {
    getProducts: (req, res) => res.sendFile(pages.products),
    getWishlist: (req, res) => res.sendFile(pages.products)
};

module.exports = pagesController;
