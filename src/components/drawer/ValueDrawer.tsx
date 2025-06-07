import { ArrowLeft } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { startCase } from "lodash";
import { useMemo, useState } from "react";

export const ValueDrawer = ({
  data = [] as Array<Record<string, string>>,
  placement = "right" as "right" | "left" | "top" | "bottom",
  open = false,
  dataKey = "text",
  onClose = () => {},
}) => {
  const [search, setSearch] = useState("");
  const searchData = useMemo(() => {
    if (search) {
      return data.filter((item) =>
        String(item[dataKey]).toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [data, dataKey, search]);

  return (
    <Drawer anchor={placement} open={open} onClose={onClose}>
      <div className="relative w-80">
        <div className="p-3 sticky top-0 border-b flex w-full bg-slate-100 z-10">
          <div>
            <IconButton onClick={onClose} color="info">
              <ArrowLeft fontSize="inherit" />
            </IconButton>
          </div>
          <div className="grow">
            <TextField
              label="Search here..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
          </div>
        </div>
        <div>
          <List dense>
            {searchData.map((item, index) => (
              <ListItem key={item[dataKey]} className="border-b">
                <ListItemAvatar>{index + 1}.</ListItemAvatar>
                <ListItemText
                  primary={startCase(String(item[dataKey]).toLowerCase())}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </Drawer>
  );
};

// import { CardValueDrawer } from "./components/CardValueDrawer"; // Adjust the path

// const sampleData = [
//   { name: "Apple", id: 1 },
//   { name: "Banana", id: 2 },
//   { name: "Orange", id: 3 },
//   { name: "Grapes", id: 4 },
// ];

// const MyComponent = () => {
//   return (
//     <div className="p-4">
//       <CardValueDrawer
//         title="Fruits"
//         value="4 Items"
//         data={sampleData}
//         dataKey="name"
//       />
//     </div>
//   );
// };

// export default MyComponent;
