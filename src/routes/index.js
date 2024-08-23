const express = require('express');
const routerUser = require('./user.router.js');
const routerCategory = require('./category.router.js');
const routerProduct = require('./product.router.js');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)

module.exports = router;