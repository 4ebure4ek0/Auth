import { action, makeObservable, observable } from 'mobx';

interface IUser {
  username: string;
  password: string;
  firstname: string;
}

class AuthStore {
  @observable username: string = '';
  @observable password: string = '';
  @observable firstname: string = '';
  @observable isRegistered: boolean = true;
  @observable error: string = '';
  @observable isLoggedIn: boolean = false;
  constructor() {
    this.changeIsRegistered = this.changeIsRegistered.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.getUsersFromStorage = this.getUsersFromStorage.bind(this);
    this.getUserFromStorageByUsername = this.getUserFromStorageByUsername.bind(this);
    this.addUserToStorage = this.addUserToStorage.bind(this);
    this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this);
    this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    makeObservable(this);
  }

  @action changeIsRegistered(): void {
    this.isRegistered = !this.isRegistered;
  }

  @action handleChangeUsername(username:string): void {
    this.username = username;
  }

  @action handleChangePassword(password:string): void {
    this.password = password;
  }

  @action handleChangeFirstname(firstname:string): void {
    this.firstname = firstname;
  }

  @action getUsersFromStorage(): string | string[][] | null {
    let users: string | string[][] | null = localStorage.getItem('users');
    if (users === null) {
      users = [];
    } else {
      users = JSON.parse(users);
    }
    return users;
  }

  @action getUserFromStorageByUsername(users: any): IUser {
    const user = users.find((u: any) => u.username === this.username);
    console.log(user);
    return user;
  }

  @action addUserToStorage(users: any): null {
    const user = {
      username: this.username,
      password: this.password,
      firstname: this.firstname
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return null;
    // localStorage.clear()
  }

  @action handleSubmitSignIn(): void {
    const users = this.getUsersFromStorage();
    const userCheck = this.getUserFromStorageByUsername(users);
    if (this.username === '' || this.password === '' || this.firstname === '') {
      this.error = 'Fill in the fields';
    } else if (userCheck !== undefined) {
      this.error = 'This username is already taken';
    } else {
      this.addUserToStorage(users);
        this.isLoggedIn = true;
    }
  }

  @action handleSubmitLogIn(): void {
    const users = this.getUsersFromStorage();
    const userCheck = this.getUserFromStorageByUsername(users);
    if (
      userCheck !== undefined &&
      this.username === userCheck.username &&
      this.password === userCheck.password
    ) {
      this.isLoggedIn = true;
      this.firstname = userCheck.firstname;
    } else {
      this.error = 'wrong username or password';
    }
  }

  @action handleLogOut(): void {
    this.isLoggedIn = false;
  }
}
const authStore = new AuthStore();
export default authStore;
