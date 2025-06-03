import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "./App.css";
import { useState } from "react";

function App() {
  const [age, setAge] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    setAge(event.target.value);
  };
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to My App
        </h1>
        <Button variant="contained" color="primary">
          MUI Button
        </Button>
      </div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Age</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default App;
