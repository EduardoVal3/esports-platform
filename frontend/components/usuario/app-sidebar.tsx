"use client"

import * as React from "react"
import {
  IconUser,
  IconShare,
  IconDeviceGamepad2,
  IconAdjustments,
  IconMail,
  IconShieldLock,
  IconCash,
  IconUserCircle,
} from "@tabler/icons-react"

import { NavMain } from "@/components/usuario/nav-main"
import { NavUser } from "@/components/usuario/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Jugador1",
    email: "jugador1@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jugador1",
  },
  navMain: [
    {
      title: "Personal",
      url: "/usuario/configuracion/personal",
      icon: IconUser,
    },
    {
      title: "Redes Sociales",
      url: "/usuario/configuracion/social",
      icon: IconShare,
    },
    {
      title: "Cuentas de Juegos",
      url: "/usuario/configuracion/juegos",
      icon: IconDeviceGamepad2,
    },
    {
      title: "Preferencias",
      url: "/usuario/configuracion/preferencias",
      icon: IconAdjustments,
    },
    {
      title: "Cuenta",
      url: "/usuario/configuracion/cuenta",
      icon: IconMail,
    },
    {
      title: "Seguridad",
      url: "/usuario/configuracion/seguridad",
      icon: IconShieldLock,
    },
    {
      title: "Retiro",
      url: "/usuario/configuracion/retiro",
      icon: IconCash,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
              <IconUserCircle className="size-5!" />
              <span className="text-base font-semibold">Mi Configuración</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
