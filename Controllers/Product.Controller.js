const createError = require('http-errors');
const pool = require('../db');
const  Pool  = require('pg');
const Product = require('../Models/Product.model');
const uploader = require('../middleware/uploader');





// module.exports = {
    

  const  getAllProducts = async (req, res, next) => {

            const allProducts = await pool.query("SELECT * FROM products");
        res.json({status: 200,data: allProducts.rows});
    }

  const createNewProduct= async (req, res, next) => {
            const {name, price, id} = req.body;
            // const image = req.file.path;

            console.log( '++++++++++++',req.body, '=============');

            // function upload(image, (err, res)=> {
            //     if (err) {
            //         console.log(err);
            //     }
            //     if (res){
            //         [name, price, res.path]
            //     }
            // })
            // if(req.method === 'POST') {
                // const url = [];
                const file = req.file.path;
                console.log("--------", file);
                // for(const file of files) {
                    
                    // const {path} = file
                    const newPath = await uploader(file)
        
                    console.log(',,,,,,,', newPath);

                    const newProduct = await pool.query(
                        "INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *",
                        [name, price, newPath]
                    );
            // }
        
        if(newProduct.rowCount === 0) {
            return res.json({status: 400, message: 'bad request'});
        }
        return res.json({status: 200, message: 'product created', data: newProduct.rows});
    }

    const findProductById= async (req, res, next) => {
        
        const {id} = req.params;
    try {
        const product = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]); 
        
        if (product.rowCount === 0) {
            return res.json({status: 400, message: 'product does not exist'});
            // throw new Error (createError(404, "product not exist")); 

        } 
            // console.log(product);
        res.json({status: 200, data: product.rows[0]});

    

        } 
        catch (error) {
            console.error(`product does not exist: ${error}`);
            // if (error instanceof Pool.CastError) {
            //     return next(createError(400, "Invalid Request"));
            // }
            // next(error);
        }
    }

    const updateAProduct= async (req, res, next) => {
    
        // try {
            const {id} =req.params;
            const {price, name} = req.body;
            const {image} = req.body.file;
            const updateProduct = await pool.query("UPDATE products SET price = $1, name = $2, image = $3 WHERE product_id = $4", [price,name,image,id]);
            
            if (updateProduct.rowCount === 0) {

                return res.json({status: 400, message: 'product does not exist'});

            } 
                return res.json({status: 200, message: 'product updated'});
            
        // } catch (error) {
        //     // console.log(error.message);
        //     // if (error instanceof Pool.CastError) {
        //     //     return next(createError(400, "Invalid Request"));
        //     // }
        //     // next (error);
        //     console.log(`product does not exist: ${error}`);
        // }
    }

    const deleteAProduct= async (req, res, next) => {
        try {
        const id = req.params.id;
            
                const deleteProduct = await pool.query("DELETE FROM products WHERE product_id = $1", [id]);
                if (deleteProduct.rowCount === 0) {
                    return res.json({status: 400, message: 'product does not exist'});
                }  
                    return res.json({status: 200, message: 'product deleted', res: deleteProduct});
                
                
        } catch (error) {
            console.log(`product does not exist: ${error}`)
            return res.json({status: error.statusCode, message: error.message});
        }

        // const id = req.params.id;
        // try {
            
            // const deleteProduct = await pool.query("DELETE FROM products WHERE product_id = $1", [id])
                
            // if (!deleteProduct ) {

                // throw next(createError(404, "product not exist"));

            // } else {

            //     console.log("0000000000");
                // res.json({status: 200, message: "product deleted"});
            // }
            // return Promise.deleteAProduct;
            // deleteProduct
            // .then(res =>{  } res.json({status: 200, message: "product deleted", res}))
            // .catch(error => console.error(`product does not exist: ${error}`)
            // )
           
        // } catch (error) {
        //     // console.log(error, ":::::::::::::");
        //     // if (error instanceof Pool.CastError) {
        //     //     return next(createError(400, "BAD REQUEST"));  
        //     // }
        //     // next(error);
        //     // res.json({status: 400, message: "Bad request"});
        //     console.log( "hhhhhhhh");
        // }
        
    }

    module.exports = {
        getAllProducts,
        createNewProduct,
        updateAProduct,
        deleteAProduct, 
        findProductById
    }
    
// }