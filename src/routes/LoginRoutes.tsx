import { lazy } from "react";

// project import
import MinimalLayout from "../layout/MinimalLayout";

// render - login
const AuthLogin = lazy(() => import("../pages/authentication/Login"));
const AuthRegister = lazy(() => import("../pages/authentication/Register"));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "register",
      element: <AuthRegister />,
    },
  ],
};

export default LoginRoutes;
