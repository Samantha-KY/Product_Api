const cloudinary = require('./cloudinary');

const uploader = (path) => cloudinary.uploads(path, 'Products');

module.exports = uploader;