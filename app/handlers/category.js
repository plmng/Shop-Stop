const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
    req.render('category/add');
}
module.exports.addPost = (req, res) => {
    let category = req.body;
    Category.create(category).then(() => {
        res.redirect('/');
    })
}