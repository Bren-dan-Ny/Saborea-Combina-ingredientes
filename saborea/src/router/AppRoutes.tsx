import { Route, Routes } from "react-router-dom";
import { Paths } from "./path";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Favorites from "../pages/favorites/Favorites";
import ProtectedRoute from "./ProtectedRoute";
import RecipeDetail from "../pages/recipeDetail/RecipeDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={Paths.inicio} element={<Home />} />
      <Route path={Paths.login} element={<Login />} />
      <Route path={`${Paths.recipe}/:id`} element={<RecipeDetail />} />

      <Route element={<ProtectedRoute />}>
        <Route path={Paths.favorites} element={<Favorites />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
