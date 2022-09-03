import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import List from "./pages/List/List";
import Create from "./pages/Create/Create";

function App() {
  const App = () => {
    let routes = useRoutes([
      { path: "/", element: <MainPage /> },
      { path: "/create", element: <Create /> },
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
