import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        this._products = [];

        makeAutoObservable(this);
    }

    get products() {
        return this._products;
    }
    setProducts(products) {
        this._products = products;
    }
}