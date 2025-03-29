import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "@fontsource/rubik"; // Defaults to weight 400
import "@fontsource/rubik/300.css"; // Lighter weight
import "@fontsource/rubik/700.css"; // Bolder weight

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
