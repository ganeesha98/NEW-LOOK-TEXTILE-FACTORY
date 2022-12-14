// const product = require('../models/Stock_and_Product_Management);
// const { errorHandler } = require('../helpers/dbErrorHandler');

// exports.userById = (req, res, next, id) => {
//     User.findById(id).exec((err, user) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 error: 'Product not found'
//             });
//         }
//         req.product = product;
//         next();
//     });
// };

// exports.read = (req, res) => {
//     req.profile.password = undefined;
//     //req.profile.salt = undefined;
//     return res.json(req.profile);
// };
