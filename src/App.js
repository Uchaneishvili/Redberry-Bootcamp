import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import List from "./pages/List/List";
import Create from "./pages/Create/Create";
import Detail from "./pages/DetailPage/Detail";

function App() {
  const App = () => {
    let routes = useRoutes([
      { path: "/", element: <MainPage /> },
      { path: "/employeeInfo", element: <Create /> },
      { path: "/LaptopSpecs", element: <Create /> },
      { path: "/list", element: <List /> },
      { path: "/info/:id", element: <Detail /> },
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
