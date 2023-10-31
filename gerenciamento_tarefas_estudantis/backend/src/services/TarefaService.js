const Tarefa = require('../models/Tarefa');
const PermissionError = require('../errors/PermissionError');
const QueryError = require('../errors/QueryError');
const { Op } = require('sequelize');

class tarefaService {
    async createTarefa(tarefa) { // response
      await Tarefa.create(tarefa)
      //.then(result => body.tarefaId = result.id);
    }

    async deleteTarefa(id) {
      const tarefa = await Tarefa.findByPk(id);
  
      if (!tarefa) {
        throw new QueryError(`Nao foi encontrado um projeto com o ID: ${id}`);
      }
      
      await tarefa.destroy();
    }

    async getAllTarefas() {
      const tarefas = await Tarefa.findAll({raw: true, attributes: ['id', 'name', 'deadline', 'subject', 'value', 'activity']});
      if (!tarefas) {
        throw new QueryError(`Nao foi encontrado nenhum projeto`);
      }
  
      return tarefas;   
    }

    async getTarefasById(id) {
        const tarefa = await Tarefa.findByPk(id, {raw: true, attributes:
          {
            exclude: ['createdAt', 'updatedAt'],
          },
        });
        if (!tarefa) {
          throw new QueryError(`Nao foi encontrado um projeto com o ID: ${id}`);
        }
    
        return tarefa;
      }
    

    async updateTarefa(id, body) {
      const tarefa = await Tarefa.findByPk(id);

      if (!tarefa) {
        throw new QueryError(`Nao foi encontrado um projeto com o ID: ${id}`);
      }
      
      body.name = body.name;
      await tarefa.update(body);
    }

    async getTarefaIdByName(name) {
      const tarefa = await Tarefa.findOne({
        where: { name: name },
      });

      if (!tarefa) {
        throw new QueryError(`Nao foi encontrado um projeto com o nome: ${name}`);
      }
  
      return tarefa;
    }

    async getTarefaMateria(subject) {
      const tarefa = await Tarefa.findAll({
        where: { subject: subject },
      });

      if (!tarefa) {
        throw new QueryError(`Nao foi encontrada essa materia: ${subject}`);
      }

      return tarefa;
    }
    async getTarefadate(deadline1) {
      const deadline = new Date(deadline1).toDateString()
      const tarefa = await Tarefa.findAll({
        where: { deadline: {[Op.lt]:deadline} },
      });

      console.log(deadline)
      console.log(tarefa)

      if (!tarefa) {
        throw new QueryError(`Nao foi encontrado um projeto com essa data: ${data}`);
      }

      return tarefa;
    }
}

module.exports = new tarefaService;