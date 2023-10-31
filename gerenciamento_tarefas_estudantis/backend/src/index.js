const app = require('./config/express-config');
/*global process*/
const port = process.env.PORT; //caminho para acessar a variavel
//api tem que rodar em uma porta para que o front possa acessar essa porta
app.listen(port, console.log(`Server is running on port ${port}`));

const user = [ {
    id: 1,
    name: 'user',
},
{
    id:2,
    name: 'user2',
}

];

app.get('/', (req,res) => {
    res.send(user);
}); //get chama a api -> quando chamar vai responder hello world