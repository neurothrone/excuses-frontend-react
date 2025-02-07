import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Routes, Route} from "react-router";
import AllExcuses from "./pages/AllExcuses";
import AddExcuse from "./pages/AddExcuse";
// import ExcuseDetail from "./pages/ExcuseDetail";
// import UpdateExcuse from "./pages/UpdateExcuse";
import Navigation from "./components/Navigation";
import {store} from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Navigation/>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<AllExcuses/>}/>
          <Route path="/add" element={<AddExcuse/>}/>
          {/*<Route path="/excuses/:id" element={<ExcuseDetail/>}/>*/}
          {/*<Route path="/update/:id" element={<UpdateExcuse/>}/>*/}
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
