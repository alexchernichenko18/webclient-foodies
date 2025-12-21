import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LayoutPublic from "./layouts/LayoutPublic";
import LayoutPrivate from "./layouts/LayoutPrivate";
import Modals from "./components/Modals/Modals";

const Main = lazy(() => import("./pages/Main"));
const Test = lazy(() => import("./pages/Test"));
const Category = lazy(() => import("./pages/Category"));
const AddRecipe = lazy(() => import("./pages/AddRecipe"));
const Recipe = lazy(() => import("./pages/Recipe"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <>
      <Modals />

      <Suspense fallback={null}>
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
      </Suspense>
    </>
  );
}

export default App;
