import { Outlet } from "react-router-dom";
import Header from "../pages/home/header/Header";
import Footer from "../pages/home/footer/Footer";
import { CheckConnection } from "../components/checkconnection/CheckConnection";

const PublicLayout = ({ setMode }: any) => {
  return (
    <>
      <Header setMode={setMode} />
      <CheckConnection>
        <Outlet />
      </CheckConnection>
      <Footer />
    </>
  );
};

export default PublicLayout;
