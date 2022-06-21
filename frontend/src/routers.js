import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import { ADMIN_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/contstans";

export const authRouters = [
    // {
    //     path: ADMIN_ROUTE,
    //     Component: Admin
    // }
]

export const publicRouters = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: PRODUCT_ROUTE + "/:id",
        Component: Product
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]