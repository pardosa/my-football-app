import { lazy } from "react";

// project import
import MainLayout from "../layout/MainLayout";
import { Teams } from "../pages/teams";

// render - dashboard
const DashboardDefault = lazy(() => import("../pages/dashboard"));

// render - sample page
const SamplePage = lazy(() => import("../pages/extra-pages/SamplePage"));
const Leagues = lazy(() => import("../pages/leagues"));

// render - utilities
const Typography = lazy(
  () => import("../pages/components-overview/Typography")
);
const Color = lazy(() => import("../pages/components-overview/Color"));
const Shadow = lazy(() => import("../pages/components-overview/Shadow"));
const AntIcons = lazy(() => import("../pages/components-overview/AntIcons"));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "color",
      element: <Color />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
        {
          path: "leagues",
          element: <Leagues />,
        },
        {
          path: "teams",
          element: <Teams />,
        },
        {
          path: "teams/:id/:season",
          element: <Teams />,
        },
      ],
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
    {
      path: "shadow",
      element: <Shadow />,
    },
    {
      path: "typography",
      element: <Typography />,
    },
    {
      path: "icons/ant",
      element: <AntIcons />,
    },
  ],
};

export default MainRoutes;
