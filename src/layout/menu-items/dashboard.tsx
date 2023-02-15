// assets
import {
  DashboardOutlined,
  BoxPlotOutlined,
  TeamOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  DashboardOutlined,
  BoxPlotOutlined,
  TeamOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "group-dashboard",
  title: "Navigation",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: "leagues",
      title: "Leagues",
      type: "item",
      url: "/dashboard/leagues",
      icon: icons.BoxPlotOutlined,
      breadcrumbs: true,
    },
    {
      id: "teams",
      title: "Teams",
      type: "item",
      url: "/dashboard/teams",
      icon: icons.TeamOutlined,
      breadcrumbs: true,
    },
  ],
};

export default dashboard;
