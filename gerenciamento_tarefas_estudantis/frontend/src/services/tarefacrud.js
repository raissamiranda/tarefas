import api from "./api";

function parseDateToYYYYMMDD(dateStr) {
  const dateS = dateStr.split('/').reverse().join('/');
  const date = new Date(dateS);
  const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return formatted;
}

function formatDate(timestamp) {
  const date = new Date(timestamp);

  return `${date.getDate() + 1}/${[date.getMonth()]}/${date.getFullYear()}`
}

export async function handleTarefaCreate(event) {
  // TODO: Navegar para outra tela depois do cadastro.

  event.preventDefault();

  const newProjectData = new FormData(event.currentTarget);

  const projectName = String(newProjectData.get('projectName'));

  const deadline = parseDateToYYYYMMDD(String(newProjectData.get('deadline')));
  const ContractId = newProjectData.get('ContractId');

  let teamForm = String(newProjectData.get('team'));
  const team = [];

  for (let user of teamForm.split(",")) {
    team.push(JSON.parse(user.replaceAll(";", ",")).id);
  }

  try {
    const res = await api.post('/projects/create',
      {
        projectName,
        deadline,
        ContractId,
        team
      })

    console.log(res);
    alert(res.statusText);
    // TODO: navigate('/');

  } catch (err) {
    if (err.response) {
      if (typeof err.response.data === 'string') {
        alert(err.response.data);
      } else {
        for (let errMsg of err.response.data)
          alert(errMsg.msg);
      }
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
  }

}

export async function getTarefa(id) {
  const res = await api.get(`/tarefa/getTarefa/${id}`)

  return res.data;
}

export const deleteTarefa = async (id) => {
  try {
    await api.delete(`/tarefa/delete/${id}`);
    alert(`Projeto ${id} deletado com sucesso.`);
  } catch (err) {
    console.log(err);
  }
}
