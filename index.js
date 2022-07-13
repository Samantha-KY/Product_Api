const express = require('express');
const morgan = require('morgan');
const knex = require('knex');
const ProductRoute = require('./Routes/Product.route');
const createError = require('http-errors');
const apiErrorHndler = require ('./Error/api-error-handler');
const fileupload = require('express-fileupload');
// const dotenv = require('dotenv').config();


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
// app.use(fileupload());

// initialize db
require('./db');

// app.all('/test', (req, res) => {
//     // console.log(req.query);
//     // console.log(req.query.name);
//     // res.send(req.query);
//     // console.log(req.params);
//     // res.send(req.params);
//     console.log(req.body);
//     res.send(req.body);
// });

app.use('/products', ProductRoute);

// 404 handler and pass to error handler
// app.use((req, res, next) => {
//     // const err = new Error('not found');
//     // err.status = 404;
//     // next(err);
//     next(createError(404, "Not Found"));
// });

// // error handler
app.use((err, req, res, next)=> {
    res.status(err.status || 500)
    res.send({
        error : {
            status: err.status || 500,
            message: err.message
        }
    })
})

// function errorHandler(err, req, res, next) {
//     if(err instanceof multer.MulterError){
//         res.json({
//             success:0,
//             message: err.message
//         })
//     }
// }
// app.use(errorHandler);
// app.use('/image', express.static('/upload/image'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server at port ${PORT}....`);
})