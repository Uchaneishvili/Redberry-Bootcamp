import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import EmployeeInfo from "./pages/EmployeeInfo/EmployeeInfo";
import LaptopSpecs from "./pages/LaptopSpecs/LaptopSpecs";

function App() {
  const App = () => {
    let routes = useRoutes([
      { path: "/", element: <MainPage /> },
      { path: "/employeeInfo", element: <EmployeeInfo /> },
      { path: "/laptopSpecs", element: <LaptopSpecs /> },
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
