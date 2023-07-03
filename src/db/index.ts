import { IDataBase, IUserDataBase, IUserBody, ErrorMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

class DataBase implements IDataBase {
  constructor(private users: IUserDataBase[]) {}

  public async getUsers() {
    return this.users;
  }

  public async getUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  public async addUser(body: IUserBody) {
    const user: IUserDataBase = {
      id: uuidv4(),
      ...body,
    };
    this.users.push(user);
    return user;
  }

  public updateUser(id: string, body: Partial<IUserBody>) {
    return new Promise<true>((resolve, reject) => {
      let isUserExist = false;

      this.users = this.users.map((user) => {
        if (user.id === id) {
          isUserExist = true;
          return { ...user, ...body };
        } else {
          return user;
        }
      });

      isUserExist
        ? resolve(true)
        : reject(new Error(ErrorMessage.USER_NOT_FOUND));
    });
  }

  public removeUser(id: string) {
    return new Promise<true>((resolve, reject) => {
      let isUserExist = false;

      this.users = this.users.filter((user) => {
        if (user.id === id) {
          isUserExist = true;
          return false;
        }
        return true;
      });

      isUserExist
        ? resolve(true)
        : reject(new Error(ErrorMessage.USER_NOT_FOUND));
    });
  }
}

export default new DataBase([]);
