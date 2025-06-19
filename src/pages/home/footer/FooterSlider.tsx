import Emp from "../../../../public/assets/png/emp.webp";
import Emp1 from "../../../../public/assets/png/emp1.png";
import Emp2 from "../../../../public/assets/png/emp2.png";
import Emp3 from "../../../../public/assets/png/employee.png";
import Emp4 from "../../../../public/assets/png/employee-management.jpg";
import FooterCarousel from "../../../components/slick/FooterCarousel";
import colors from "../../../color";

const FooterSliderFeature = () => {
  const portalList = [
    {
      Name: "Cashlessindia",
      Image: Emp,
      Link: "http://cashlessindia.gov.in/",
    },
    {
      Name: "public",
      Image: Emp1,
      Link: "https://pgportal.gov.in/",
    },
    {
      Name: "webdirectory",
      Image: Emp2,
      Link: "https://igod.gov.in/",
    },
    {
      Name: "degitalindia",
      Image: Emp3,
      Link: "https://www.digitalindia.gov.in/",
    },
    {
      Name: "mygov",
      Image: Emp4,
      Link: "https://www.mygov.in/",
    },
  ];

  return (
    <div
      className="p-8 !bg-gradient-to-r from-[#31aea8] to-[#05438a]"
      style={{ backgroundColor: colors["ui-card-light"] }}
    >
      <FooterCarousel data={portalList} />
    </div>
  );
};

export default FooterSliderFeature;
