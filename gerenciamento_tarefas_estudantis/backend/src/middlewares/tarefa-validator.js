const { body } = require('express-validator');
const validate = require('./validate');

function getValidations(method) {
  switch (method) {
    case 'createTarefa': {
      return [
        body('name')
            .exists()
            .withMessage('É preciso colocar um nome!')
            .notEmpty()
            .withMessage('O campo de nome deve estar preenchido'),
        body('deadline')
            .exists()
            .withMessage('Precisa conter uma data de entrega!')
            .isDate()
            .withMessage('A data inserida não é valida!'),
        body('subject')
            .notEmpty()
            .withMessage('O campo de id do contrato deve ser preenchido!')
            .isDecimal()
            .withMessage('O id inserido não é válido!'),
        body('value')
            .optional()
            .withMessage('quanto vale essa tarefa?')
            .isDecimal()
            .withMessage('O id inserido não é válido!'),
        body('activity')
            .optional()
            .notEmpty()
            .withMessage('O id inserido não é válido!'),    
      ];
    };
    case 'updateTarefa': {
      return [
        body('name')
          .optional()
          .notEmpty()
          .withMessage('O campo de nome deve estar preenchido'),
        body('deadline')
          .optional()
          .isDate()
          .withMessage('A data inserida não é valida!'),
        body('subject')
          .optional()
          .notEmpty()
          .withMessage('O campo de id do contrato deve ser preenchido!')
          .isDecimal()
          .withMessage('O id inserido não é válido!'),
        body('value')
          .optional()
          .withMessage('quanto vale essa tarefa?')
          .isDecimal()
          .withMessage('O id inserido não é válido!'),
        body('activity')
          .optional()
          .withMessage('qual o tipo dessa tarefa?')
          .isDecimal()
          .withMessage('O id inserido não é válido!'),
      ];
    };
  }
}

function tarefaValidate(method) {
  const validations = getValidations(method);
  return validate(validations);
}

module.exports = tarefaValidate;