import { Outlet } from "react-router-dom";
import Header from "../pages/home/header/Header";
import Footer from "../pages/home/footer/Footer";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
