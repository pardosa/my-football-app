// assets
import { DashboardOutlined, BoxPlotOutlined } from "@ant-design/icons";

// icons
const icons = {
  DashboardOutlined,
  BoxPlotOutlined,
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
  ],
};

export default dashboard;
