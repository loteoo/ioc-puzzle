import diffDays from './diffDays';

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  createdAt: string;
}

export default class User implements UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  createdAt: string;

  constructor(obj: UserData) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.city = obj.city;
    this.createdAt = obj.createdAt;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get registeredDate() {
    return new Date(this.createdAt)
    .toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  get daysSinceRegistered() {
    return diffDays(this.createdAt, new Date().toISOString());
  }
}

export const virtualProps = ['fullName', 'registeredDate', 'daysSinceRegistered']
