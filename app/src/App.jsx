import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/templ/MainLayout";
import Input from "./Components/atoms/Input";
import TaskDetails from "./Components/pages/TaskDetails/TaskDetails";

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
          <Route path="/tasks/:id" element={<TaskDetails/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
