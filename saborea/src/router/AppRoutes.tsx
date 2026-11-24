import { Route, Routes } from "react-router-dom";
import { Paths } from "./path";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Favorites from "../pages/favorites/Favorites";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={Paths.login} element={<Login />} />
      <Route path={Paths.favorites} element={<Favorites />} />
    </Routes>
  );
};
export default AppRoutes;
