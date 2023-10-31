const router = require('express').Router();

const TarefaService = require('../services/TarefaService');

const objectFilter = require('../middlewares/object-filter');
const tarefaValidate = require('../middlewares/tarefa-validator');
// const {uploadContract} = require('../middlewares/multer');

const {
    verifyJWT,
} = require('../middlewares/auth-middlewares');

router.post('/createTarefa',
  objectFilter('body', ['name', 'deadline', 'subject', 'value', 'activity']),
  //verifyJWT,
  //tarefaValidate('createTarefa'),
  async (req, res, next) => {
    try {
      const tarefa = {
        name: req.body.name,
        deadline: req.body.deadline,
        subject: req.body.subject,
        value: req.body.value,
        activity: req.body.activity,
      };

      await TarefaService.createTarefa(tarefa);

      res.status(200).end();
    } catch (error) {
      next(error);
    }
});


router.get('/getTarefas',
    verifyJWT,
  async (req, res, next) => {
    try {
      const tarefas = await TarefaService.getAllTarefas();
    
      res.status(200).json(tarefas);
    } catch (error) {
      next(error);
    }
});

router.get('/getTarefa/:id',
    verifyJWT,
  async (req, res, next) => {
    try {
      const tarefaId = req.params.id;
      const tarefa = await TarefaService.getTarefasById(tarefaId);

      res.status(200).json(tarefa);
    } catch (error) {
      next(error);
    }
});

router.get('/getTarefadate/:deadline',
    //objectFilter('body', ['deadline']),
    verifyJWT,
  async (req, res, next) => {
    try {
      const tarefadate = req.params.deadline;
      const tarefa = await TarefaService.getTarefadate(tarefadate);

      res.status(200).json(tarefa);
    } catch (error) {
      next(error);
    }
});

router.get('/getTarefaMateria/:subject',
    //objectFilter('body', ['subject']),
    verifyJWT,
  async (req, res, next) => {
    try {
      const tarefamat = req.params.subject;
      const tarefa = await TarefaService.getTarefaMateria(tarefamat);

      res.status(200).json(tarefa);
    } catch (error) {
      next(error);
    }
});

router.put('/update/:id',
  objectFilter('body', ['name', 'deadline', 'subject', 'value', 'activity']),
  verifyJWT,
  //tarefaValidate('updateTarefa'),
  async (req, res, next) => {
    try {
      await TarefaService.updateTarefa(req.params.id, req.body);

      res.status(200).end();
    } catch (error) {
      next(error);
    }
});

router.delete('/delete/:id',
    verifyJWT, 
  async (req, res, next) => {
    try {
      await TarefaService.deleteTarefa(req.params.id);

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;