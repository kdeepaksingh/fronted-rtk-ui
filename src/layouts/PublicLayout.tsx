import { Outlet } from "react-router-dom";
import Header from "../pages/home/header/Header";
import Footer from "../pages/home/footer/Footer";
import { useForm } from "react-hook-form";
import RHFListInput from "../components/dropdowns/RHFListInput";

const PublicLayout = () => {
  const {control} = useForm()
  return (
    <>
      <Header />
      <RHFListInput
        name="fruit"
        control={control}
        label="Select a Fruit"
        placeholder="Choose..."
        data={[
  { id: 1, value: "Apple" },
  { id: 2, value: "Banana" },
  { id: 3, value: "Cherry" },
]}
        required
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
