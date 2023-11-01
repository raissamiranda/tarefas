import api from "./api";

async function getAllUsers() {
  const response = await api.get('//todosUsuarios')
  return response.data;
}

async function LoginSubmit(email, password) {
  await api.post('/users/login', { email, password })
}

async function LogoutSubmit() {
  await api.get('/users/logout');
}

async function SignUpSubmit(newUserData) {
  await api.post('/users/createUser', {
    name: newUserData.get('firstName'),
    email: newUserData.get('email'),
    password: newUserData.get('password'),
    interests: newUserData.get('interests'),
    term: newUserData.get('term'),
    subjects: newUserData.get('subjects'),
  })
}
async function TarefaSignUp(newProjectData) {
  await api.post('/tarefa/createTarefa', newProjectData)
}

async function TarefaUpdate(newProjectData, id) {
  await api.put(`/tarefa/update/${id}`, newProjectData)
}

async function DeleteUser(id) {
  try {
    await api.delete(`/users/delete/${id}`);
    console.log(`Usuario ${id} deletado com sucesso.`);
  } catch (error) {
    console.log(error.response);
  }
}

async function EditUser(id, nome, email) {

  await api.put(`/api/usuario/${id}`,
    {
      nome: nome,
      email: email
    })
    .then(console.log(`Usuario ${id} editado com sucesso.`))
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}

async function getUser(id, myself) {
  const res = (myself ? await api.get(`users/myAccount`) : await api.get(`/users/getUser/${id}`));
  const user = {
    id: Number(res.data.id),
    name: res.data.name,
    email: res.data.email,
    password: res.data.password,
    interests: res.data.interests,
    term: Number(res.data.term),
    subjects: res.data.subjects,
  }
  return user;
}

async function LoginID() {
  const res = await api.get('users/me')
  return res.data
}
async function Tarefas() {
  const res = await api.get('tarefa/getTarefas')
  return res.data
}

export { getAllUsers, LoginSubmit, DeleteUser, EditUser, SignUpSubmit, getUser, LogoutSubmit, LoginID, Tarefas, TarefaSignUp, TarefaUpdate }