const User = require('../models/UserModel');

exports.index = async function(req, res) {
    res.render('login');
}
 