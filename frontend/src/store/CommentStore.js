import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        this._comments = [];

        makeAutoObservable(this);
    }

    get comments() {
        return this._comments;
    }
    setComments(comments) {
        this._comments = comments;
    }
}