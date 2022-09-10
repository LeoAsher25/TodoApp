import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "src/components/Loading";
import PageWrap from "src/components/PageWrap";
import Homepage from "src/pages/HomePage";
import LoginPage from "src/pages/LoginPage";
import NotFound from "src/pages/NotFound";
import TodoPage from "src/pages/TodoPage";
import UserPage from "src/pages/UserPage";
import PrivatedRoute from "src/routes/PrivatedRoute";
import { routerPaths } from "src/constant";

const MainRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={routerPaths.LOGIN} element={<LoginPage />} />
        <Route path="" element={<PageWrap />}>
          <Route path="" element={<PrivatedRoute />}>
            <Route path={routerPaths.HOME} element={<Homepage />} />
            <Route path={routerPaths.USER} element={<UserPage />} />
            <Route path={routerPaths.TODO} element={<TodoPage />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
