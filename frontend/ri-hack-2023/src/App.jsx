import { useState } from "react";
import Input from "./Components/Input/Input";
import { Route, Routes } from "react-router-dom";
import Button from "./Components/Button/Button";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Input placeholder={"plc"} label={"Lbl"} />}
        ></Route>

        <Route path="/" element={<Button>Gumb</Button>}></Route>
      </Routes>
    </>
  );
}

export default App;
