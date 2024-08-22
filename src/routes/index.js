const express = require('express');
const routerUser = require('./user.router.js');
const routerCategory = require('./category.router.js');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/categories', routerCategory)

module.exports = router;