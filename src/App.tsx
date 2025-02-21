import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./AppSIdebar";

export const App = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
