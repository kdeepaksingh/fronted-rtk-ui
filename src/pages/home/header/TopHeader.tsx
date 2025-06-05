import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Icon from "../../../components/icon/Icon";
import Link from "../../../components/anchor/Link";

const TopHeader = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        px: 2,
        py: 1,
        width: "100%",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Icon name={"Group"}  />
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: 12 }}
            >
              Employee Management System
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: 12 }}
            >
              XYZ PVT. LTD.
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: 12 }}
            >
              Hyderabad of India
            </Typography>
          </Box>
        </Grid>

        {/* Right: Accessibility Options, Colors, Font Size, Language */}
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent={{ xs: "flex-start", md: "flex-end" }}
          alignItems="center"
          gap={2}
          flexWrap="wrap"
        >
          <Link
            className="scrren"
            text={"Screen Reader Access"}
          />
          <Link
            className="scrren"
            text={"Skip to main content"}
          />

          {/* Color theme blocks
          <Box display="flex" alignItems="center" gap={0.5}>
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: "#f47c3c",
                border: "1px solid #ccc",
              }}
            />
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: "#fff",
                border: "1px solid #ccc",
              }}
            />
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: "#000",
                border: "1px solid #ccc",
              }}
            />
          </Box> */}

          {/* Font size controls */}
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
            >
              A<sup>+</sup>
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
            >
              A
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
            >
              A<sup>-</sup>
            </Typography>
          </Box>

          {/* Language dropdown */}
          <Select
            defaultValue="en"
            size="small"
            sx={{
              height: 30,
              fontSize: 12,
              borderRadius: "20px",
              minWidth: 90,
              "& .MuiSelect-select": {
                padding: "2px 10px",
              },
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">हिन्दी</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopHeader;
