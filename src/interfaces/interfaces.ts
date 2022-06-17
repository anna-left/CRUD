interface IUserData {
  username: string;
  age: number;
  hobbyes: string[];
}

interface IUser extends IUserData {
  id: string;
}

export { IUserData, IUser };
