const User = require('../models/User');
const bcrypt = require('bcrypt');
const PermissionError = require('../errors/PermissionError');
const QueryError = require('../errors/QueryError');
const nodemailer = require('nodemailer');

class UserService {
  async createUser(user) {
    const saltRounds = 10;

    user.password = await bcrypt.hash(user.password, saltRounds);
    await User.create(user);
  }

  async updatePassword(user, code) {
    const saltRounds = 10;
    const senha = {password: code};
    senha.password = await bcrypt.hash(senha.password, saltRounds);
    await user.update(senha);
  }

  async getAllUsers() {
    const users = await User.findAll({raw: true, attributes:['id', 'name', 'email']});
    if (!users) {
      throw new QueryError(`Nao foi encontrado nenhum usuario`);
      // return;
    }

    return users;   
  }

  async getUserById(id) {
    const user = await User.findByPk(id, {raw: true, attributes:
      {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    if (!user) {
      throw new QueryError(`Nao foi encontrado um usuario com o ID: ${id}`);
    }

    return user;
  }

  async updateUser(id, body, currentUserId, currentUserRole, roleIsUpdated) {
    const user = await User.findByPk(id);
    const saltRounds = 10;

    if (body.password) {
      body.password = await bcrypt.hash(body.password, saltRounds);
    }

    if (!user) {
      throw new QueryError(`Nao foi encontrado um usuario com o ID: ${id}`);
    }
    
    await user.update(body);
  } 

  async deleteUser(id, reqUserId) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new QueryError(`Nao foi encontrado um usuario com o ID: ${id}`);
    }

    if (id == reqUserId) {
      throw new PermissionError('Você não tem permissão para se deletar!');
    }
    await user.destroy();
  }

  async sendEmail(email) {
    let code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    let codeString = code.toString();
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ijuniorteste1@gmail.com',
        pass: 'ijunior2022'
      }
    });

    var mailOptions = {
      from: 'ijuniorteste1@gmail.com',
      to: email,
      subject: 'Criação nova senha',
      text: codeString
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } 
    });

    return codeString;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new QueryError(`Nao foi encontrado um usuario com o email: ${email}`);
    }

    return user;
  }

  async getUserByName(name) {
    const user = await User.findOne({
      where: { name: name },
    });
    if (!user) {
      throw new QueryError(`Nao foi encontrado um usuario com o nome: ${name}`);
    }

    return user;
  }
}

module.exports = new UserService;