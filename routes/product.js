var express = require('express');
var router = express.Router();
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');

router.get('/', async (req, res) => {
    var productList = await ProductModel.find({}).populate("category", ["name"]);
    res.render('admin/index', { productList });
});

router.get('/add', async (req, res) => {
    var categories = await CategoryModel.find({});
    res.render('admin/add', { categories });
});

router.post('/add', async (req, res) => {
    var product = req.body;
    await ProductModel.create({
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description,
        price: product.price,
        category: product.category,
        gender: product.gender,
        dateAdded: new Date().toJSON(),
    });
    res.redirect('/product');
});

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var product = await ProductModel.findById(id);
    var categories = await CategoryModel.find({});
    res.render('admin/edit', { product, categories });
});

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var product = req.body;
    await ProductModel.findByIdAndUpdate(id, {
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description,
        price: product.price,
        category: product.category,
        gender: product.gender,
    });
    res.redirect('/product');
});

router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    res.redirect('/product');
});

router.post('/search', async (req, res) => {
    let keyword = req.body.keyword;
    let products = await ProductModel.find({ name: new RegExp(keyword, "i") });
    res.render('admin/index', { productList: products });
});

router.get('/sortprice/asc', async (req, res) => {
    let productList = await ProductModel.find().sort({ price: 1 });
    res.render('admin/index', { productList });
});

router.get('/sortprice/desc', async (req, res) => {
    let productList = await ProductModel.find().sort({ price: -1 });
    res.render('admin/index', { productList });
});

router.get('/boy', async (req, res) => {
    let productList = await ProductModel.find({ gender: "Boy" });
    res.render('admin/index', { productList });
});

router.get('/girl', async (req, res) => {
    let productList = await ProductModel.find({ gender: "Girl" });
    res.render('admin/index', { productList });
});
router.get('/list', async (req, res) => {
   var productList = await ProductModel.find({});
   res.render('admin/list', { productList });
});
module.exports = router;
