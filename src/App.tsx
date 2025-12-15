import { Routes, Route, Navigate } from "react-router-dom";

import LayoutPublic from "./layouts/LayoutPublic";
import LayoutPrivate from "./layouts/LayoutPrivate";

import Main from "./pages/Main";
import Test from "./pages/Test";
import Category from "./pages/Category";
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import MyProfile from "./pages/MyProfile";
import Profile from "./pages/Profile";
import Modals from "./components/Modals/Modals";

function App() {
  return (
    <>
      <Modals />

      <Routes>
        {/* PUBLIC LAYOUT */}
        <Route element={<LayoutPublic />}>
          <Route path="/" element={<Main />} />
          <Route path="/category/:id" element={<Category />} />
        </Route>

        {/* PRIVATE LAYOUT */}
        <Route element={<LayoutPrivate />}>
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        {/* Test page */}
        <Route path="/test" element={<Test />} />
        {/* 404 -> redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
