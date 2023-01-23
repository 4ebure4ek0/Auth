import React from 'react'
import { action, makeObservable, observable } from "mobx";


class LogStore{
    username: string = ''
    password: string = ''
    firstname: string = ''
    isRegistered: boolean = true
    error: string = ''
    isLogggedIn: boolean = false
    constructor(){
        this.changeIsRegistered = this.changeIsRegistered.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getUsersFromStorage = this.getUsersFromStorage.bind(this)
        this.getUserFromStorageByUsername = this.getUserFromStorageByUsername.bind(this)
        this.addUserToStorage = this.addUserToStorage.bind(this)
        this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this)
        this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this)
        makeObservable(this, {
            username: observable,
            password: observable,
            firstname: observable,
            isRegistered: observable,
            isLogggedIn: observable,
            error: observable,
            changeIsRegistered: action,
            handleSubmitSignIn: action,
            handleSubmitLogIn: action
        })
    }
    changeIsRegistered():void{
        this.isRegistered? this.isRegistered = false: this.isRegistered = true
    }
    handleChange(event: React.KeyboardEvent<HTMLInputElement> | any):void{
        let value = event.target.value
        let name = event.target.name
        if (name == 'username'){
            this.username = value
        } if(name == 'password'){
            this.password = value
        } else
            this.firstname = value
    }
    getUsersFromStorage(): string | string[][]|null {
        let users: string | string[][] | null = localStorage.getItem('users')
        if (users == null){
            users = []
        } else{
            users = JSON.parse(users)
        }
        return users
    }
    getUserFromStorageByUsername(users: any){
        let user = users.find((u:any) => u.username == this.username)
        console.log(user)
        return user
    }
    addUserToStorage(users: any, userCheck:any){
        if (userCheck !== undefined){
            this.error = 'This username is already taken'
            console.log(this.error)
            return null
        }
        if(this.username === '' || this.password === '' || this.firstname === ''){
            this.error = 'Fill in the fields'
            console.log(this.error)
            return null
        } else{
        let user = {
            username: this.username,
            password: this.password,
            firstname: this.firstname
        }
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users))
    }
        // localStorage.clear()
    }
    handleSubmitSignIn(){
        let users = this.getUsersFromStorage()
        let userCheck = this.getUserFromStorageByUsername(users)
        console.log(users)
        this.addUserToStorage(users,userCheck)
        this.isLogggedIn = true
    }
    handleSubmitLogIn(){
        let users = this.getUsersFromStorage()
        let userCheck = this.getUserFromStorageByUsername(users)
        if(userCheck !== undefined && this.username == userCheck.username && this.password == userCheck.password){
            this.isLogggedIn = true
            this.firstname = userCheck.firstname
        } else{
            this.error = "wrong username or password"
        }
    }
}
const logStore = new LogStore()
export default logStore