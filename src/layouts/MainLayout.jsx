import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
// import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <Outlet /> {/* এখানে nested route গুলো render হবে */}
      </div>
    </div>
  );
};

export default MainLayout;
