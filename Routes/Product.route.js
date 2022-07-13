const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const {getAllProducts, createNewProduct, updateAProduct, deleteAProduct, findProductById} = require('../Controllers/Product.Controller');

const {uploadImage} = require('../middleware/upload');
const Product = require('../Models/Product.model');

//get all products
router.get('/', getAllProducts);
//create product
router.post('/',uploadImage.single('image'), createNewProduct);
//get product by id
router.get('/:id',findProductById);
//update product by id
router.patch('/:id', updateAProduct);
//delete product by id
router.delete('/:id', deleteAProduct);
//upload
// router.post('/upload', ProductController.uploadImage);
module.exports = router;