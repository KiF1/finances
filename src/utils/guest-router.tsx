import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextApplication } from "../context/ContextApplication";

export function GuestRoute({ children }: any) {
  const { user } = useContext(ContextApplication);
  const redirect = useNavigate();

  useEffect(() => {
    if (user) {
      redirect("/home");
    }
  }, []);

  return children;
}