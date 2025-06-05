import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();
  return (
    <div>
      <h1>{t("Header.UserName")}</h1>
    </div>
  )
}

export default Header
