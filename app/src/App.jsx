import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/templ/MainLayout";
import Login from "./Components/pages/Login/Login";
import Register from "./Components/pages/Register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/krec" element={<h1>something</h1>} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
