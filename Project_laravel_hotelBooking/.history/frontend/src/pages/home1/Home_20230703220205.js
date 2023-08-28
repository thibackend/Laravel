import React from "react";
import Navbar from "./Navbar";
import tokenService from "../../services/token.service";
import { Navigate, Outlet } from "react-router-dom";

function Home() {
  const isAuth = tokenService.getToken() || undefined;
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }
  if (isAuth.username === "admin") {
    return <Navigate to="/admin" />;
  }
  return (
    <>
      <Navbar />
      <div className">
        <Outlet />
      </div>
    </>
  );
}
export default Home;
