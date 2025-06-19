import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../../components/buttons/MainButton";
import Url from "../../../components/constants/Url";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col font-sans">
      <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-[#6f0e14] to-[#10765f] text-white">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate(Url.Home)}
        >
          Employee Management
        </div>
        <nav className="space-x-6 hidden md:block">
          <Link to="#features" className="hover:underline !font-semibold">
            Features
          </Link>
          <Link to="#about" className="hover:underline !font-semibold">
            About
          </Link>
          <Link to="#contact" className="hover:underline !font-semibold">
            Contact
          </Link>
          <Link to="#contact" className="hover:underline !font-semibold">
            Services
          </Link>
        </nav>
        <div>
          <MainButton
            ButtonName={"Action.Login"}
            type="button"
            url={"/login"}
            className="!bg-orange-600 !font-semibold !px-3 !py-1"
          />
        </div>
      </header>
    </div>
  );
};

export default NavBar;
