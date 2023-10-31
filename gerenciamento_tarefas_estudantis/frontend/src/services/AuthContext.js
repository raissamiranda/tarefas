import React from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

import {
  isAuthenticated,
  getUserStorage,
  setUserStorage,
  forgetUser
} from './auth';


const AuthContext = React.createContext({
  handleSignUp: () => { },
  fetchUserStorage: () => false,
  handleLogout: (jwtIsSet = true) => { },
  user: undefined,
  userId: String,
});



function AuthProvider({ children }) {

  const [user, setUser] = React.useState(undefined);
  const [userId, setUserId] = React.useState("");

  const navigate = useNavigate();


  async function handleSignUp(event) {
    event.preventDefault();
    const newUserData = new FormData(event.currentTarget);

    try {
      await api.post('/users/createUser',
        {
          name: newUserData.get('firstName'),
          email: newUserData.get('email'),
          password: newUserData.get('password'),
          interesses: newUserData.get('interesses'),
          periodo: newUserData.get('periodo'),
          materias: newUserData.get('materias'),
        })


      navigate("/");

    } catch (err) {
      //! Refatorar
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

  async function handleLogout(jwtIsSet = true) {

    try {
      if (jwtIsSet)
        await api.get('/users/logout');

      setUser(undefined);
      forgetUser();
      navigate("/");

    } catch (err) {
      //! Refatorar
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




  function fetchUserStorage() {
    const user = getUserStorage();
    if (user === undefined)
      return false;
    setUser(user);
    return true;
  }

  return (
    <AuthContext.Provider value={{ handleSignUp, fetchUserStorage, handleLogout, user, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth };