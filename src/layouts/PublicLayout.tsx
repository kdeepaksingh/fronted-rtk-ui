import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <h1>Header component calling here</h1>
      <Outlet />
      <h1>Footer component here</h1>
    </>
  );
};

export default PublicLayout;
