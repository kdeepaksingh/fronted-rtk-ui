import { useNavigate } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import Translate from "../../components/typography/Translate";
import Icon from "../../components/icon/Icon";
import colors from "../../color";
import MainButton from "../../components/buttons/MainButton";
const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        gap: 3,
        px: 2,
      }}
    >
      <Icon
        name={"ErrorOutline"}
        style={{
          fontSize: window.innerWidth < 900 ? 100 : 100,
          color: colors["ui-brown"],
        }}
      />

      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", md: "1.8rem" },
          background: `linear-gradient(45deg, ${colors["ui-brown"]}, ${colors["ui-brown-dark"]})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <Translate dataKey={`Error.PageNotFound`} />
      </Typography>

      <Typography
        variant="body1"
        sx={{ maxWidth: 500, fontSize: { xs: "1.5rem", md: "1.2rem" } }}
      >
        <Translate dataKey={`Description.ErrorMsg`} />
      </Typography>

      <MainButton
        ButtonName={`Link.BackToHome`}
        onClick={() => navigate("/")}
        sx={{
          backgroundColor: colors["ui-brown-dark"],
          color: colors["ui-white"],
          fontWeight: "600",
          fontSize: { xs: "1rem", md: "0.8rem" },
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: colors["ui-brown"],
          },
        }}
      />
    </Container>
  );
};

export default PageNotFound;
