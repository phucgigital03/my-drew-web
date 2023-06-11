import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { Fragment } from "react";

import { DefaultLayout } from "./layouts";
import { publicRoutes} from "./routes";
import NotFound from "./pages/NotFound";
import RenderPrivateRoute from "./components/RenderPrivateRoute";

function App() {
  console.log('re-render')
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            RenderPrivateRoute()
          }
          {
            publicRoutes.map((publicRoute,ind)=>{
              let LayOut = DefaultLayout;
              const Page = publicRoute.Component
              if(publicRoute.LayOut === null){
                LayOut = Fragment;
              }else if(publicRoute.LayOut){
                LayOut = publicRoute.LayOut;
              }
              return (
                <Route
                  key={ind}
                  path={publicRoute.path}
                  element={
                    <LayOut>
                      <Page/>
                    </LayOut>
                  }
                />
              )
            })
          }
          <Route 
            path="*" 
            element={
              <DefaultLayout>
                <NotFound/>
              </DefaultLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
