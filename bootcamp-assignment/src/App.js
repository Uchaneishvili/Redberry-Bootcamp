import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import EmployeeInfo from "./pages/EmployeeInfo/EmployeeInfo";
import LaptopSpecs from "./pages/LaptopSpecs/LaptopSpecs";
import List from "./pages/List/List";

function App() {
  const App = () => {
    let routes = useRoutes([
      { path: "/", element: <MainPage /> },
      { path: "/employeeInfo", element: <EmployeeInfo /> },
      { path: "/laptopSpecs", element: <LaptopSpecs /> },
      { path: "/list", element: <List /> },
    ]);
    return routes;
  };
  return (
    <Router>
      <App />
    </Router>
  );
}

export default App;
