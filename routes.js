const express = require('express');
const router = express.Router();

const views = require('./views/products-view');
const productsController = require('./controllers/products-controller');

// Views
router.get('/', views.getProducts);
router.get('/wishlist', views.getWishlist);

// API Controllers
router.get('/api/products', productsController.getAll);
router.get('/api/products/:search', productsController.getBySearch);
router.get('/api/products/wishlist/:userId', productsController.getAll);

module.exports = router;
