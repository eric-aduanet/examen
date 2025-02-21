import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./components/ui/sidebar";

const items = [
  {
    title: "Ejercicio 1",
    url: "ejercicio-1",
  },
  {
    title: "Ejercicio 2",
    url: "ejercicio-2",
  },
  {
    title: "Ejercicio 3",
    url: "ejercicio-3",
  },
  {
    title: "Ejercicio 4",
    url: "ejercicio-4",
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="sidebar" color="bg-primary">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Examen</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((elem, idx) => {
                return (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild>
                      <a href={elem.url}>
                        <p>{idx + 1}</p>
                        <span>{elem.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
