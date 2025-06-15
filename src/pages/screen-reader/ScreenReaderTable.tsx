import { t } from "i18next";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Text from "../../components/typography/Text";
import { RouterUtils } from "../../utils/RouterUtils";

interface ScreenReaderRow {
  name: string;
  website: string;
  type: string;
}

interface ScreenReaderTableProps {
  rows: ScreenReaderRow[];
}

const ScreenReaderTable = ({ rows }: ScreenReaderTableProps) => {
  return (
    <div className="w-full">
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "5px",
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        <Table
          aria-label="Screen Readers Access"
          size="small"
          sx={{
            borderCollapse: "separate",
            borderSpacing: 0,
            "& th, & td": {
              border: "none",
              borderBottom: "1px solid #d97b00",
            },
            "& thead th": {
              backgroundColor: "#f9e7dc",
              color: "#ec6d05",
              textAlign: "center",
              fontWeight: 600,
              textTransform: "uppercase",
              fontSize: "14px",
            },
            "& tbody td": {
              textAlign: "center",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>{t("Columns.ScreenReader")}</TableCell>
              <TableCell>{t("Columns.Website")}</TableCell>
              <TableCell>{t("Columns.FreeorCommercial")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={`${row.name}-${index}`}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <span
                    className="inline-block lg:inline-flex items-center cursor-pointer"
                    onClick={() => RouterUtils.confirmAndRedirect(row.website)}
                  >
                    {row.website}
                    <Text
                      text="Typo.LinkExternal"
                      size={14}
                      className="ml-0 lg:ml-2"
                      color="primary"
                    />
                  </span>
                  <Text text="Typo.ExternalWebsite" size={14} />
                </TableCell>
                <TableCell>{row.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ScreenReaderTable;
