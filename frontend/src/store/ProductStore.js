import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        this._comments = [
            {
                id: 1,
                product_id: 1,
                comment: "Iphone 13: Contrary to popular belief, Lorem Ipsum is not simply random text."
            },
            {
                id: 2,
                product_id: 1,
                comment: "Iphone 13: It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
            }
        ];
        this._products = [
            {
                id: 1,
                name: "Iphone 13",
                price: 959,
                img: "iphone13.jpg"
            },
            {
                id: 2,
                name: "Iphone 13 PRO",
                price: 1113,
                img: "iphone13-pro.jpg"
            }
        ];

        makeAutoObservable(this);
    }

    get products() {
        return this._products;
    }
    get comments() {
        return this._comments;
    }
    setProduct(products) {
        this._products = products;
    }
    setComment(comments) {
        this._comments = comments;
    }
}