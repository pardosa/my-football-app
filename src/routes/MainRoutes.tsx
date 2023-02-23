import { lazy } from "react";

// project import
import MainLayout from "../layout/MainLayout";

const Fixtures = lazy(() => import("../pages/fixtures"));
const Leagues = lazy(() => import("../pages/leagues"));
const Teams = lazy(() => import("../pages/teams"));
const Fixture = lazy(() => import("../pages/fixture"));
const Player = lazy(() => import("../pages/player"));
const Standings = lazy(() => import("../pages/standings"));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Leagues />,
    },
    {
      path: "dashboard",
      children: [
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
        {
          path: "standings/:id/:season",
          element: <Standings />,
        },
        {
          path: "fixtures/:id/:season",
          element: <Fixtures />,
        },
        {
          path: "fixture/:id",
          element: <Fixture />,
        },
        {
          path: "player/:id",
          element: <Player />,
        },
      ],
    },
  ],
};

export default MainRoutes;
