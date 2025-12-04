import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "../pages/ItemListPage";
import ItemDetailsPage from "../pages/ItemDetailsPage";
import CreateItemPage from "../pages/CreateItemPage";
import UpdateItemPage from "../pages/UpdateItemPage";
import { ROUTES } from "../constants/routes";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path={ROUTES.LIST_ITEMS} element={<ListPage />} />
      <Route path={ROUTES.ITEM_DETAILS} element={<ItemDetailsPage />} />
      <Route path={ROUTES.ITEM_EDIT} element={<UpdateItemPage/>} />
      <Route path={ROUTES.ITEM_CREATE} element={<CreateItemPage/>} />
      <Route path = "*" element={<div>404 Not Found</div>} />
    </Routes>
  </Router>
);
