import React from "react";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <main style={{ minHeight: "92vh" }}>
        <Outlet />
      </main>
  )
}




