import Home from "~/pages/Home"
import ScrapBooks from "~/pages/ScrapBooks"
import Introduce from "~/pages/Introduce"
import configs from "~/configs"
import { IntroduceLayout } from "~/layouts"

const publicRoutes = [
    {path: configs.routes.introduce, LayOut: IntroduceLayout, Component: Introduce},
    {path: configs.routes.home, Component: Home},
    {path: configs.routes.scrapbooks, Component: ScrapBooks},
]

const privateRoutes = []

export {
    publicRoutes,
    privateRoutes
}