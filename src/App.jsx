import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/rubik"; // Defaults to weight 400
import "@fontsource/rubik/300.css"; // Lighter weight
import "@fontsource/rubik/700.css"; // Bolder weight
import Homepage from "./pages/Homepage";
import { ProfileProvider } from "./contexts/Profile";

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
