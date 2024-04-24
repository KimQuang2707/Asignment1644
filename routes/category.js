const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/CategoryModel');

// Delete Category
router.get('/delete/:id', async (req, res) => {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.redirect('/category');
});

// Add Category
router.get('/add', async (req, res) => {
    var categories = await CategoryModel.find({});
    res.render('category/add', { categories });
});

// List Categories
router.get('/', async (req, res) => {
    var categoryList = await CategoryModel.find({});
    res.render('category/index', { categoryList });
});



module.exports = router;
