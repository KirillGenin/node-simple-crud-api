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
  getUser: (id: string) => Promise<IUserDataBase | undefined>;
  addUser: (body: IUserBody) => Promise<IUserDataBase>;
  updateUser: (
    id: string,
    body: Partial<IUserBody>
  ) => Promise<IUserDataBase | undefined>;
  removeUser: (id: string) => Promise<true>;
}

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ErrorMessage {
  PAGE_NOT_FOUND = 'Page not found..',
  INVALID_JSON = 'Invalid JSON body!',
  INVALID_REQUEST_BODY = 'Request body does not contain required fields!',
  USER_NOT_FOUND = 'User not found!',
  INVALID_USER_ID = 'Invalid user ID!',
  INVALID_METHOD = 'Invalid HTTP request method',
}
