const express = require('express');
const router = express.Router();

const pagesController = require('./controllers/pages-controller');
const productsController = require('./controllers/products-controller');

// Views
router.get('/', pagesController.getProducts);
router.get('/wishlist', pagesController.getWishlist);

// API Controllers
router.get('/api/products', productsController.getAll);
router.get('/api/products/:search', productsController.getBySearch);
router.get('/api/products/wishlist/:userId', productsController.getAll);

module.exports = router;
