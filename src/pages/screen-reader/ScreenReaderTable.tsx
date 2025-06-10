import { t } from "i18next";
import { Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Text from "../../components/typography/Text";
import { RouterUtils } from "../../utils/RouterUtils";

const ScreenReaderTable = ({ rows }) => {
  return (
    <div className="w-full">
      <TableContainer>
        <Table aria-label="Screen Readers Access" size="small">
          <TableHead>
            <TableRow>
              <TableCell className="!font-semibold !uppercase !text-orange-500 !pl-0">
                {t("Columns.ScreenReader")}
              </TableCell>
              <TableCell className="!font-semibold !uppercase !text-orange-500 ">
                {t("Columns.Website")}
              </TableCell>
              <TableCell className="!font-semibold !uppercase !text-orange-500 ">
                {t("Columns.FreeorCommercial")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell className="!pl-0">{row.name}</TableCell>
                <TableCell>
                  <p
                    className="inline-block lg:inline-flex items-center cursor-pointer"
                    onClick={() => {
                      RouterUtils.confirmAndRedirect(row.website);
                    }}
                  >
                    {row.website}

                    <Text
                      text={"Typo.LinkExternal"}
                      size={14}
                      className="ml-0 lg:ml-2"
                      color="primary"
                    />
                  </p>

                  <Text text={"Typo.ExternalWebsite"} size={14} />
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
