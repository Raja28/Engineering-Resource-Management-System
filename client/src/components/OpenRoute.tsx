
// This will prevent authenticated users from accessing this route
import React from "react";
import  { Navigate } from "react-router-dom";
import { useStore } from "../store";

function OpenRoute({ children }: { children: React.ReactNode }) {
  const token = useStore((state) => state.token);

  return token === null ? children : <Navigate to={"/dashboard"} />;
}



export default OpenRoute