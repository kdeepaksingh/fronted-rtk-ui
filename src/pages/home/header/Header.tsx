import NavBar from "./NavBar";
import TopHeader from "./TopHeader";

const Header = ({ setMode }: any) => {
  return (
    <div>
      <TopHeader setMode={setMode} />
      <main id="main-content" tabIndex={-1}>
        <NavBar />
      </main>
    </div>
  );
};

export default Header;
