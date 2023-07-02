import { IDataBase, IUserDataBase, IUserBody } from '../types';
import { v4 as uuidv4 } from 'uuid';

class DataBase implements IDataBase {
  constructor(private users: IUserDataBase[]) {}

  public async getUsers() {
    return this.users;
  }

  public getUser(id: string) {
    return new Promise<IUserDataBase>((resolve, reject) => {
      const user = this.users.find((user) => user.id === id);
      user ? resolve(user) : reject(new Error('User not found!'));
    });
  }

  public async addUser(body: IUserBody) {
    this.users.push({
      id: uuidv4(),
      ...body,
    });
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

      isUserExist ? resolve(true) : reject(new Error('User not found!'));
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

      isUserExist ? resolve(true) : reject(new Error('User not found!'));
    });
  }
}

export default new DataBase([]);
