export interface ILogin{
    login:string;
    password:string;
}

export interface ISignUp{
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface IUser{
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  [key: string]: string | number;
}
export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
  }
