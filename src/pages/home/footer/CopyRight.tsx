import { Box, Typography, Container } from "@mui/material";
import moment from "moment";
import colors from "../../../color";
import Translate from "../../../components/typography/Translate";

const CopyRight = () => {
  const todayDate = moment().format("DD-MMM-YYYY");
  const currentYear = moment().format("YYYY");

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors["ui-orange"],
        py: 2,
        mt: "auto",
        borderTop: "1px solid #ddd",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          align="center"
          sx={{
            fontSize: {
              xs: "1.2rem",
              sm: "0.8rem",
              md: "1rem",
            },
            color: colors["ui-white"],
            fontWeight: 500,
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <Translate dataKey={"Typo.FooterContent"} />
          <Translate dataKey="Typo.LastUpdated" params={{ date: todayDate }} />
          {/* &nbsp;
          <Translate
            dataKey="Typo.TotalVisitors"
            params={{ count: totalVisitors }}
          /> */}
          <br />
          &copy;{currentYear} <Translate dataKey={"Typo.FooterCopyRight"} />
        </Typography>
      </Container>
    </Box>
  );
};

export default CopyRight;
