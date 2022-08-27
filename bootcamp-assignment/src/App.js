import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import EmployeeInfo from "./pages/EmployeeInfo/EmployeeInfo";

function App() {
  const App = () => {
    let routes = useRoutes([
      { path: "/", element: <MainPage /> },
      { path: "/employeeInfo", element: <EmployeeInfo /> },
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
