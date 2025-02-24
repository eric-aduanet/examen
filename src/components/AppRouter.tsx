import { Navigate, Route, Routes } from "react-router-dom";
import { Ejercicio1 } from "./Ejercicio1";
import { Ejercicio4 } from "./Ejercicio4";
import { Ejercicio3 } from "./Ejercicio3";
import { Ejercicio2 } from "./Ejercicio2";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/ejercicio-1" element={<Ejercicio1 />} />
      <Route path="/ejercicio-2" element={<Ejercicio2 />} />
      <Route path="/ejercicio-3" element={<Ejercicio3 />} />
      <Route path="/ejercicio-4" element={<Ejercicio4 />} />
      <Route path="/*" element={<Navigate to="/ejercicio-1" />} />
    </Routes>
  );
};
