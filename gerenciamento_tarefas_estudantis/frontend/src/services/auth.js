import { User } from './AuthContext';
export const USER_KEY = "@projetoInterno-User";


export const isAuthenticated = () => localStorage.getItem(USER_KEY) !== null;

export function setUserStorage(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUserStorage(){
  const userStorageJSON = localStorage.getItem(USER_KEY);
  if (userStorageJSON === null)
    return undefined;

  return JSON.parse(userStorageJSON);
}

export function forgetUser() {
  localStorage.removeItem(USER_KEY);
}