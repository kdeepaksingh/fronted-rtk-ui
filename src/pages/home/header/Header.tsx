import NavBar from "./NavBar";
import TopHeader from "./TopHeader";

const Header = ({ setMode }: any) => {
  return (
    <div>
      <TopHeader setMode={setMode} />
      <NavBar />
    </div>
  );
};

export default Header;
