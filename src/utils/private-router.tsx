import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Router } from "../Router";
import { ContextApplication } from "../context/ContextApplication";

export function ProtectedRoute({ children }: any) {
  const { user } = useContext(ContextApplication);
  const redirect = useNavigate();

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, []);

  return user ? children : <Router />;
}