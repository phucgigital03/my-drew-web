import Home from "~/pages/Home"
import Introduce from "~/pages/Introduce"
import configs from "~/configs"
import { IntroduceLayout } from "~/layouts"

const publicRoutes = [
    {path: configs.routes.introduce , LayOut: IntroduceLayout, Component: Introduce},
    {path: configs.routes.home,Component: Home},
]

const privateRoutes = []

export {
    publicRoutes,
    privateRoutes
}