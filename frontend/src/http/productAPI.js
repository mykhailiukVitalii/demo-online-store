import {$authHost, $host} from "./index";

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product/new', product);

    return data
}

export const fetchProducts = async (commentId, page, limit= 8) => {
    const {data} = await $host.get('api/product/products');

    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id);

    return data
}

export const fetchProductComments = async (id) => {
    const {data} = await $host.get('api/product/' + id + '/comments');

    return data
}

//TODO:WIP if you have free time
// export const createComment = async (type) => {
//     const {data} = await $authHost.post('api/type', type)
//     return data
// }

// export const fetchComments = async () => {
//     const {data} = await $host.get('api/type')
//     return data
// }