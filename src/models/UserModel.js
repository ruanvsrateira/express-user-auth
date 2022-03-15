const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
});

const UserModel = mongoose.model("User", UserModelSchema);

class User{
    constructor(body) {
        this.body = body;
    }

    async registerNewUser() {
        await UserModel.create({
            nome: this.body.nome,
            email: this.body.email,
            senha: this.body.password,
        });
    }
}


User.validaLogin = async function(email, senha){
    const user = await UserModel.findOne({
        email: email,
        senha: senha
    });

    return user;
}

User.userExist = async function(email) {
    const exist = await UserModel.findOne({
        email: email
    });

    exist ? true : false
}

module.exports = User;