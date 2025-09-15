import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import JoinUs from "../pages/JoinUs";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
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
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
