const User = require('../models/UserModel');

exports.index = async function(req, res) {
    res.render('cadastro');
}

exports.createNewUser = async function(req, res) {
    const user = new User(req.body);

    await user.registerNewUser();

    res.redirect('back');
}