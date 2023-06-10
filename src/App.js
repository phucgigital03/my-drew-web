import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import { DefaultLayout } from "./layouts";
import { publicRoutes,privateRoutes } from "./routes";
import NotFound from "./pages/NotFound";

function App() {
  const user = useSelector(state => state.user)
  console.log(user)
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* public route */}
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
          {
            privateRoutes.map((privateRoute,ind)=>{
              let LayOut = DefaultLayout;
              const Page = privateRoute.Component
              if(privateRoute.LayOut === null){
                LayOut = Fragment;
              }else if(privateRoute.LayOut){
                LayOut = privateRoute.LayOut;
              }
              return (
                <Route
                  key={ind}
                  path={privateRoute.path}
                  element={
                    <LayOut>
                      <Page/>
                    </LayOut>
                  }
                />
              )
            })
          }
          {/* 404 page */}
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
