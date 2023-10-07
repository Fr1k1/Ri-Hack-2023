import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/templ/MainLayout";
import Login from "./Components/pages/Login/Login";
import Register from "./Components/pages/Register/Register";
import TaskDetails from "./Components/pages/TaskDetails/TaskDetails";
import Tasks from "./Components/pages/Tasks/Tasks";
import Profile from "./Components/pages/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/krec" element={<h1>something</h1>} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/add-job" element={<h1>Test</h1>} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
