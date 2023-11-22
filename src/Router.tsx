import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Banks } from "./pages/Banks";
import { Planning } from "./pages/Planning";
import { ProtectedRoute } from "./utils/private-router";
import { GuestRoute } from "./utils/guest-router";
import { Login } from "./pages/Login";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<GuestRoute><Login /></GuestRoute>}></Route>
      <Route path="/" element={ <DefaultLayout /> }>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/bank" element={<ProtectedRoute><Banks /></ProtectedRoute>} />
        <Route path="/planning" element={<ProtectedRoute><Planning /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}