import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._isAdmin = false;
        this._name = "Demo user"; //TODO: how move to Sign IN

        makeAutoObservable(this);
    }

    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
    get name() {
        return this._name;
    }
    get isAdmin() {
        return this._isAdmin;
    }
    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }
    setName(name) {
        this._name = name;
    }
    setIsAdmin(bool) {
        this._isAdmin = bool;
    }
}