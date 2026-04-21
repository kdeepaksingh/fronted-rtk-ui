import { Outlet } from "react-router-dom";
import Header from "../pages/home/header/Header";
import Footer from "../pages/home/footer/Footer";
import { CheckConnection } from "../components/checkconnection/CheckConnection";

const PublicLayout = ({ setMode }: any) => {
  return (
    <>
      <Header setMode={setMode} />
      {/* <main id="main-content" tabIndex={-1}> */}
      <CheckConnection>
        <Outlet />
      </CheckConnection>
      {/* </main> */}
      <Footer />
    </>
  );
};

export default PublicLayout;
