import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import JoinUs from "../pages/JoinUs";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Notification from "../pages/Notification";
import Membership from "../pages/Membership";
import Login from "../pages/Login";
import PostDetails from "../pages/PostDetails";
import AddPost from "../pages/AddPost";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // use element for wrapper
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
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
      {
        path: "/membership",
        element: <Membership />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
      },
      {
        path: "/add-post",
        element: <AddPost></AddPost>,
      },
    
    ],
  },
]);

export default router;
