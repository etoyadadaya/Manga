import React, {FC, lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Main from "./main";

const Registration = lazy(() => import("./registration"));
const Login = lazy(() => import("./login"));

const Router: FC = () => (
  <Suspense fallback="Loading...">
    <Routes>
      <Route
        path="/main"
        element={<Main />}
      />
      <Route
        path="/registration"
        element={<Registration />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
    </Routes>
  </Suspense>
);

export default Router;
