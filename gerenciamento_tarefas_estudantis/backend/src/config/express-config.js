require('dotenv').config();

const User = require('../models/User');

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const express = require('express'); //chama a biblioteca instalada

(async () => {
    const database = require('../database/index');
    const Usuario = require('../models/User');
    const Tarefa = require('../models/Tarefa');
 
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();



const app = express(); //faz uso da biblioteca instalada em uma constante pra ficar mais facil de chamar o express
app.use(cors(corsOptions));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const usersRouter = require('../controller/user-controller');
app.use('/users', usersRouter); // Definição de Router de usuários

const tarefaRouter = require('../controller/tarefa-controller');
app.use('/tarefa', tarefaRouter);

module.exports = app;