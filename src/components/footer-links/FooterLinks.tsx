import { useNavigate } from "react-router-dom";
import Translate from "../typography/Translate";

interface FooterLinkItem {
  url: string;
  text: string;
}

interface FooterLinksProps {
  links?: FooterLinkItem[];
}

export const FooterLinks = ({ links = [] }: FooterLinksProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-4">
      {links.map((item, i) => (
        <div
          key={i}
          className="cursor-pointer"
          onClick={() => navigate(item.url)}
        >
          <Translate dataKey={item.text} />
        </div>
      ))}
    </div>
  );
};  

export default FooterLinks;
