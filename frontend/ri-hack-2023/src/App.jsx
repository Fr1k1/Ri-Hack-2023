import { useState } from "react";
import Input from "./Components/Input/Input";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Input placeholder={"plc"} label={"Lbl"} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
