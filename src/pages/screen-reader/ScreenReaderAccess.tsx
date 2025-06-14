import { t } from "i18next";
import CommonTitle from "../../components/typography/CommonTitle";
import ScreenReaderTable from "./ScreenReaderTable";

export const ScreenReaderAccess = () => {
  const rows = [
    {
      name: t("Typo.ScreenReaderinfo1"),
      website: "http://www.nvda-project.org/",
      type: t("Typo.Free"),
    },
    {
      name: t("Typo.ScreenReaderinfo2"),
      website: "http://webinsight.cs.washington.edu/",
      type: t("Typo.Commercial"),
    },
    {
      name: t("Typo.ScreenReaderinfo3"),
      website: "http://www.yourdolphin.co.uk/productdetail.asp?id=5",
      type: t("Typo.Vision"),
    },
    {
      name: t("Typo.ScreenReaderinfo4"),
      website: "http://www.freedomscientific.com/Downloads/JAWS",
      type: t("Typo.Mission"),
    },
    {
      name: t("Typo.ScreenReaderinfo5"),
      website: "http://www.yourdolphin.co.uk/productdetail.asp?id=1",
      type: t("Typo.Policy"),
    },
    {
      name: t("Typo.ScreenReaderinfo5"),
      website: "http://www.yourdolphin.co.uk/productdetail.asp?id=1",
      type: t("Typo.Policy"),
    },
    {
      name: t("Typo.ScreenReaderinfo6"),
      website: "http://www.gwmicro.com/Window-Eyes/",
      type: t("Typo.Sitemap"),
    },
  ];

  return (
    <div className="py-3 px-3 pt-1 pb-2 mb-2">
      <CommonTitle text="Screen Reader Access" className="mb-2" />
      <ScreenReaderTable rows={rows} />
    </div>
  );
};

export default ScreenReaderAccess;
