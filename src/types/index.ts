export interface IUserBody {
  username: string;
  age: number;
  hobbies: string[];
}

export interface IUserDataBase extends IUserBody {
  id: string;
}

export interface IDataBase {
  getUsers: () => Promise<IUserDataBase[]>;
  getUser: (id: string) => Promise<IUserDataBase>;
  addUser: (body: IUserBody) => Promise<void>;
  updateUser: (id: string, body: Partial<IUserBody>) => Promise<true>;
  removeUser: (id: string) => Promise<true>;
}
