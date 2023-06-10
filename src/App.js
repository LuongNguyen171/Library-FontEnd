import { publicRoutes } from "./routes";
import DefaultLayout from "./component/DefaultLayout";
import LoginLayout from "./component/LoginLayout";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = (route.layout)? LoginLayout : DefaultLayout;
            return (
              <Route
                key={index}
                path=  {route.path}
                element={
               
                   <Layout>
                    <Page />
                  </Layout>
              
                } 
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
