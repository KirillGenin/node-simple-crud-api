import { IUserBody } from '../types';

export const isApiPage = (url: string) => /^\/api\/users(\/)?$/.test(url);

export const isApiPageWithId = (url: string) =>
  /^\/api\/users\/(.+)$/.test(url);

export const isValidUser = (user: IUserBody) => {
  const isCorrectLengthProps = Object.keys(user).length === 3;
  const haveRequiredProps = ['username', 'age', 'hobbies'].every((key) =>
    user.hasOwnProperty(key)
  );
  return (
    isCorrectLengthProps &&
    haveRequiredProps &&
    typeof user.username === 'string' &&
    typeof user.age === 'number' &&
    Array.isArray(user.hobbies) &&
    user.hobbies.every((hobby) => typeof hobby === 'string')
  );
};

export const getUserIdFromUrl = (url: string) => url.replace('/api/users/', '');
