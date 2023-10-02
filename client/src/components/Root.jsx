import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <main style={{ minHeight: "92vh" }}>
      <Navbar />
      <Outlet />
    </main>
  );
}
