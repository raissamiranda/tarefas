const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const PermissionError = require('../errors/PermissionError.js');

function generateJWT(user, res) {
  const body = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign({ user: body }, 'mysecretkey',
    { expiresIn: '15d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: 'development' !== 'development',
  });
}

function cookieExtractor(req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
}

async function loginMiddleware(req, res, next) {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      throw new PermissionError('E-mail e/ou senha incorretos!');
    } else {
      const matchingPassword = await bcrypt.compare(req.body.password, user.password);
      if (!matchingPassword) {
        throw new PermissionError('E-mail e/ou senha incorretos!');
      }
    }

    generateJWT(user, res);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
}

function notLoggedIn(req, res, next) {
  try {
    const token = cookieExtractor(req);

    if (token) {
      const decoded = jwt.verify(token, 'mysecretkey');
      if (decoded) {
        throw new PermissionError('Você já está logado no sistema!');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

function verifyJWT(req, res, next) {
  try {
    const token = cookieExtractor(req);
    if (token) {
      const decoded = jwt.verify(token, 'mysecretkey');
      req.user = decoded.user;
    }

    if (!req.user) {
      throw new PermissionError(
        'Você precisa estar logado para realizar essa ação!');
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginMiddleware,
  notLoggedIn,
  verifyJWT,
};