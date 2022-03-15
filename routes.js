const express = require('express');
const route = express.Router();

const User = require('./src/models/UserModel')

const cadastroController = require('./src/controllers/cadastroController');
const loginController = require('./src/controllers/loginController');

route.get('/auth/cadastro', cadastroController.index);
route.post('/auth/cadastro/register', cadastroController.createNewUser);

route.get('/auth/login', loginController.index);
route.post('/auth/login/logged', async function(req, res){
    async function validaLogin(email, senha) {
        const loginValid = await User.validaLogin(email, senha);
    
        loginValid 
            ? (
            res.render('home', {user: loginValid})
        ) : (
            res.redirect('/auth/cadastro')
        ) 
    }   

    console.log(req.body.email, req.body.password);
    await validaLogin(req.body.email, req.body.password);
    
});

route.get('/home', (req, res) => res.render('home'))

module.exports = route;