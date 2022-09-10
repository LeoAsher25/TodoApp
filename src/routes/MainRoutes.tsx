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
import { RouterPaths } from "src/types/commonType";

const MainRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={RouterPaths.LOGIN} element={<LoginPage />} />
        <Route path="" element={<PageWrap />}>
          <Route path="" element={<PrivatedRoute />}>
            <Route path={RouterPaths.HOME} element={<Homepage />} />
            <Route path={RouterPaths.USER} element={<UserPage />} />
            <Route path={RouterPaths.TODO} element={<TodoPage />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
