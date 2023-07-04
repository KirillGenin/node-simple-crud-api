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

  public async updateUser(id: string, body: Partial<IUserBody>) {
    let userUpdate: IUserDataBase | undefined;

    this.users = this.users.map((user) => {
      if (user.id === id) {
        userUpdate = { ...user, ...body };
        return userUpdate;
      } else {
        return user;
      }
    });

    return userUpdate;
  }

  public async removeUser(id: string) {
    let isUserExist = false;

    this.users = this.users.filter((user) => {
      if (user.id === id) {
        isUserExist = true;
        return false;
      }
      return true;
    });
    
    return isUserExist;
  }
}

export default new DataBase([]);
