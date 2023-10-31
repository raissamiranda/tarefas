const { body } = require('express-validator');
const validate = require('./validate');

function getValidations(method) {
  switch (method) {
    case 'login': {
      return [
        body('email')
          .exists()
          .withMessage('O campo de email deve estar preenchido.')
          .isEmail()
          .withMessage('O email inserido não é válido.'),
        body('password')
          .exists()
          .withMessage('Você deve inserir uma senha.')
          .notEmpty()
          .withMessage('O campo de senha deve estar preenchido.'),
      ];
    };
    case 'create': {
      return [
        body('name')
          .exists()
          .withMessage('Você deve enviar um nome!')
          .isAlpha('pt-BR', { ignore: ' ' })
          .withMessage('Seu nome só pode conter letras!'),
        body('email')
          .exists()
          .withMessage('O campo de email deve estar preenchido!')
          .isEmail()
          .withMessage('O email inserido não é válido!'),
        body('password')
          .exists()
          .withMessage('Você deve digitar uma senha!')
          .notEmpty()
          .withMessage('O campo de senha deve estar preenchido!'),
        body('interesses')
          .exists()
          .withMessage('O campo de interesses deve estar preenchido!')
          .isAlpha('pt-BR', { ignore: ' ' })
          .withMessage('A frase inserida deve ser uma frase válida'),
        body('periodo')
          .exists()
          .withMessage('O campo de periodo deve estar preenchido!')
          .isDecimal()
          .withMessage('O número inserido deve ser um número válido (deve conter apenas números)'),
        body('materias')
          .exists()
          .withMessage('O campo de materias deve estar preenchido!')
          .isAlpha('pt-BR', { ignore: ' ' })
          .withMessage('As materias inseridas devem ser válidas'),
      ];
    };
    case 'createUser': {
      return [
        body('name')
          .exists()
          .withMessage('Você deve enviar um nome!')
          .isAlpha('pt-BR', { ignore: ' ' })
          .withMessage('Seu nome só pode conter letras!'),
        body('email')
          .exists()
          .withMessage('O campo de email deve estar preenchido!')
          .isEmail()
          .withMessage('O email inserido não é válido!'),
        body('password')
          .exists()
          .withMessage('Você deve digitar uma senha!')
          .notEmpty()
          .withMessage('O campo de senha deve estar preenchido!'),
        body('interesses')
          .exists()
          .withMessage('O campo de interesses deve estar preenchido!')
          .isAlpha('pt-BR', { ignore: ' ' })
          .withMessage('A frase inserida deve ser uma frase válida'),
        body('periodo')
          .exists()
          .withMessage('O campo de periodo deve estar preenchido!')
          .isDecimal()
          .withMessage('O número inserido deve ser um número válido (deve conter apenas números)'),
        body('materias')
          .exists()
          .withMessage('O campo de materias deve estar preenchido!')
          .isAlpha('pt-BR', { ignore: ' ' })
          .withMessage('As materias inseridas devem ser válidas'),
      ];
    };
    case 'updateUser': {
      return [
        body('name')
          .exists()
          .withMessage('Você deve enviar um nome!')
          .isAlpha('pt-BR', { ignore: ' ' })
          .withMessage('Seu nome só pode conter letras!'),
        body('email')
          .exists()
          .withMessage('O campo de email deve estar preenchido!')
          .isEmail()
          .withMessage('O email inserido não é válido!'),
        body('password')
          .exists()
          .withMessage('Você deve digitar uma senha!')
          .notEmpty()
          .withMessage('O campo de senha deve estar preenchido!'),
        body('interesses')
          .exists()
          .withMessage('O campo de interesses deve estar preenchido!')
          .isAlpha('pt-BR', { ignore: ' ' })
          .withMessage('A frase inserida deve ser uma frase válida'),
        body('periodo')
          .exists()
          .withMessage('O campo de periodo deve estar preenchido!')
          .isDecimal()
          .withMessage('O número inserido deve ser um número válido (deve conter apenas números)'),
        body('materias')
          .exists()
          .withMessage('O campo de materias deve estar preenchido!')
          .isAlpha('pt-BR', { ignore: ' ' })
          .withMessage('As materias inseridas devem ser válidas'),
      ];
    };
    case 'sendEmail': {
      return [
        body('email')
        .exists()
        .withMessage('O campo de email deve estar preenchido!')
        .isEmail()
        .withMessage('O email inserido não é válido!'),
      ];
    };
  }
}

function userValidate(method) {
  const validations = getValidations(method);
  return validate(validations);
}

module.exports = userValidate;