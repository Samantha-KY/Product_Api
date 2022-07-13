
const multer = require('multer');
const path = require('path');
// const { uploadImage } = require('../Controllers/Product.Controller');

// const uploadImage = multer({
//     dest:'image',
// });
const storage = multer.diskStorage({
    destination:'./upload/image',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const uploadImage = multer({
    storage: storage
})

module.exports = {uploadImage};