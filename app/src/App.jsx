import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/templ/MainLayout";
import Input from "./Components/atoms/Input";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/login"
            element={<Input placeholder={"plc"} label={"Lbl"} />}
          />
          <Route path="/krec" element={<h1>something</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
