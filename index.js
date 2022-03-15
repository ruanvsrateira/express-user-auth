const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_KEY)
    .then(() => {
        app.emit('DATABASE_CONNECTED');
    }).catch(e => console.log(`ERRO: ${e}`));

app.use(session({secret: "faeouifhaepfkepfjeiuhf",  }))
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('DATABASE_CONNECTED', () => {
    app.listen(3001, () => {
        console.log('Servidor iniciado');   
    });
});
