import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { Fragment } from "react";

import { DefaultLayout } from "./layouts";
import { publicRoutes } from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
