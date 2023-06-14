import { Route } from "react-router-dom";

import { DefaultLayout,DefaultPrivate } from "~/layouts";
import ProtectedRoute from "./ProtectedRoute";
import NavigateRoute from "./NavigateRoute";
import { privateRoutes } from "~/routes";
import Unauthorization from "~/pages/Unauthorization";
import configs from "~/configs";
import PersistLogin from "./PersistLogin";

const allowRoles = {
  addmin: 9999,
  user: 2003,
  employment: 2004,
}

function RenderPrivateRoute() {
    const PageAddmin = privateRoutes.addmin.Component
    const PageCustomer = privateRoutes.user.Component
    const PageEmployment = privateRoutes.employment.Component
    return ( 
    <>
        <Route 
            path={configs.routes.account} 
            element={
                <NavigateRoute>
                    <Unauthorization/>
                </NavigateRoute>
            }
        />
        <Route element={<PersistLogin/>}>
            <Route element={<ProtectedRoute allowRoles={[allowRoles.addmin]}/>}>
              <Route 
                path={privateRoutes.addmin.path}
                element={
                  <DefaultPrivate>
                    <PageAddmin/>
                  </DefaultPrivate>
                }
              />
            </Route>
            <Route element={<ProtectedRoute allowRoles={[allowRoles.employment]}/>}>
              <Route 
                path={privateRoutes.employment.path}
                element={
                  <DefaultLayout>
                      <PageEmployment/>
                  </DefaultLayout>
                }
              />
            </Route>
            <Route element={<ProtectedRoute allowRoles={[allowRoles.user]}/>}>
              <Route 
                path={privateRoutes.user.path}
                element={
                  <DefaultLayout>
                      <PageCustomer/>
                  </DefaultLayout>
                }
              />
            </Route>
        </Route>
    </>
    );
}

export default RenderPrivateRoute;