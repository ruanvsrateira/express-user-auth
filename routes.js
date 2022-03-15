const express = require('express');
const route = express.Router();
const session = require('express-session');

const User = require('./src/models/UserModel')

const cadastroController = require('./src/controllers/cadastroController');
const loginController = require('./src/controllers/loginController');

const Middlewares = require('./src/middlewares');

route.get('/auth/cadastro', cadastroController.index);
route.post('/auth/cadastro/register', cadastroController.createNewUser);

route.get('/auth/login', loginController.index);
route.post('/auth/login/logged', async function(req, res){
    async function validaLogin(email, senha) {
        const loginValid = await User.validaLogin(email, senha);
    
        loginValid 
            ? (
            req.session.user = loginValid,
            res.redirect('/home')
        ) : (
            res.redirect('/auth/cadastro')
        ) 
    }   

    console.log(req.body.email, req.body.password);
    await validaLogin(req.body.email, req.body.password);
    
});

route.get('/home', Middlewares.SessionExist, (req, res) => res.render('home', {user: req.session.user}))

route.get('/sair', Middlewares.deleteSession, (req, res) => res.render('login'));

module.exports = route;