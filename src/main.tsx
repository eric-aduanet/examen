import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { Ejercicio3 } from "./components/Ejercicio3.tsx";
import { Ejercicio4 } from "./components/Ejercicio4.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <App>
        <Ejercicio4 />
      </App>
    </SidebarProvider>
  </StrictMode>
);
