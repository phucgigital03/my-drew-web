import configs from "~/configs"
import { IntroduceLayout } from "~/layouts"
import ShowProduct from "~/pages/ShowProduct"
import ScrapBooks from "~/pages/ScrapBooks"
import Introduce from "~/pages/Introduce"
import Login from "~/pages/Login"
import Register from "~/pages/Register"
import RecoverPwd from "~/pages/RecoverPwd"
import Checkout from "~/pages/Checkout"
import DetailProduct from "~/pages/DetailProduct"
import CartPage from "~/pages/CartPage"
import { Addmin,User } from "~/pages/Private"
import Unauthorization from "~/pages/Unauthorization/Unauthorization"
import Employment from "~/pages/Private/Employment"
import AddProduct from "~/pages/Private/AddProduct"
import Products from "~/pages/Private/Products"

const publicRoutes = [
    {path: configs.routes.introduce, LayOut: IntroduceLayout, Component: Introduce},
    {path: configs.routes.login, Component: Login},
    {path: configs.routes.register, Component: Register},
    {path: configs.routes.recoverPwd, Component: RecoverPwd},
    {path: configs.routes.detailProduct, Component: DetailProduct},
    {path: configs.routes.cart, Component: CartPage},
    {path: configs.routes.checkout, Component: Checkout , LayOut: null},
    {path: configs.routes.newArrivals, Component: ShowProduct},
    {path: configs.routes.shopAll, Component: ShowProduct},
    {path: configs.routes.outerwear, Component: ShowProduct},
    {path: configs.routes.sweatshirts, Component: ShowProduct},
    {path: configs.routes.tops, Component: ShowProduct},
    {path: configs.routes.tees, Component: ShowProduct},
    {path: configs.routes.bottoms, Component: ShowProduct},
    {path: configs.routes.accessories, Component: ShowProduct},
    {path: configs.routes.scrapbooks, Component: ScrapBooks},
    {path: configs.routes.unauthorization, Component: Unauthorization},
]

const privateRoutes = {
    addmin: { path: configs.routes.addmin, Component: Addmin },
    user: { path: configs.routes.user, Component: User },
    employment: { path: configs.routes.employment, Component: Employment },
    addminAddProduct: { path: configs.routes.addminAddProduct, Component: AddProduct},
    addminProducts: { path: configs.routes.addminProducts, Component: Products },
}

export {
    publicRoutes,
    privateRoutes
}