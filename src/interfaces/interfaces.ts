interface IUserData {
  username: string;
  age: number;
  hobbies: string[];
}

interface IUser extends IUserData {
  id: string;
}

export { IUserData, IUser };
