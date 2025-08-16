import React, { useState } from "react";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/NavBar";

const App = () => {
  return <>
  <Navbar />
  <Outlet />
  </>;
};

export default App;
