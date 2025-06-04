import { Button } from "@mui/material";
import "./App.css";

function App() {
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
    </>
  );
}

export default App;
