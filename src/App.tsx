import { AppRouter } from "./AppRouter";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen">
        <SidebarTrigger />
        <AppRouter />
      </main>
      <Toaster />
    </SidebarProvider>
  );
};
