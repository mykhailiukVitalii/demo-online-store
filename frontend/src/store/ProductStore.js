import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        this._comment = [
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
                img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg"
            },
            {
                id: 2,
                name: "Iphone 13 PRO",
                price: 1113,
                img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-3.jpg"
            },
            {
                id: 3,
                name: "Iphone 12",
                price: 818,
                img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-r1.jpg"
            },
            {
                id: 4,
                name: "Iphone 12 PRO",
                price: 909,
                img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-pro-max-1.jpg"
            }
        ];

        makeAutoObservable(this);
    }

    get products() {
        return this._products;
    }
    get comment() {
        return this._comment;
    }
    setProduct(products) {
        this._products = products;
    }
    setComment(comment) {
        this._comment = comment;
    }
}