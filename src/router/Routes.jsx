import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import JoinUs from "../pages/JoinUs";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Notification from "../pages/Notification";
import Membership from "../pages/Membership";
import Login from "../pages/Login";
// import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,   // সব পেজের common layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/join-us",
        element: <JoinUs />,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/notifications",
        Component: Notification,
      },
      {
        path: "/membership",
        Component: Membership,
      },
      {
        path: "/login",
        Component: Login ,
      },
    ],
  },
]);

export default router;
