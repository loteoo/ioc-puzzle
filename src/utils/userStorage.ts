import { CurrentUser } from '/src/utils/types';

const userStorageKey = 'user';

export const readUserFromStorage = (email: string) => {
  const userJson = localStorage.getItem(`${userStorageKey}:${email}`);
  const user: CurrentUser | undefined = userJson ? JSON.parse(userJson) : undefined;
  return user;
}

export const writeUserToStorage = (user: CurrentUser) => {
  localStorage.setItem(`${userStorageKey}:${user.email}`, JSON.stringify(user));
}
