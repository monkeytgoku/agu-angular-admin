import { toCamelCase } from '../utils/string.utils';

export interface IUser {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  maritalStatus: string;
  address: string;
  mobile: string;
  avatar: string;
  status: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  lang: string;
}

export class User implements IUser {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  maritalStatus: string;
  address: string;
  mobile: string;
  avatar: string;
  status: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  lang: string;

  constructor(data?: IUser) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[toCamelCase(property)] = (data as any)[property];
        }
      }
    }
  }

  // deserialize(data: any) {
  //   Object.assign(this, data);
  //   this.car = new Car().deserialize(data.car);
  //   return this;
  // }

  get fullName() {
    let fullName = '';
    fullName += this.firstName || '';
    if (this.lastName) {
      fullName += ' ' + this.lastName;
    }
    return fullName;
  }
}
