const User = require('./models/UserModel');

exports.SessionExist = async function(req, res, next) {
    if(req.session.user) {
        console.log('Session encontrada !');
        next();
    }else {
        res.redirect('/auth/cadastro');
    }
}

exports.deleteSession = async function(req , res, next) {
    await req.session.destroy()
    next();
} 

exports.emailexist = async function(req, res, next) {
    const exist = User.userExist(req.body.email)

    if(exist == true) {
        redirect('back');
    }else {
        next();
    }
}