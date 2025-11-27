"use client"

import { useRouter } from "next/navigation"
import {
  IconCoin,
  IconDotsVertical,
  IconLogout,
  IconSettings,
  IconTrophy,
  IconUserCircle,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react"
import Link from "next/link"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar?: string | null
    saldo?: number | string | null
    creditos?: number | null
  }
}) {
  const { isMobile } = useSidebar()
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Parsear saldo a número de forma segura
  const saldoNumerico = typeof user.saldo === 'string' 
    ? parseFloat(user.saldo) 
    : (user.saldo ?? 0);
  
  // Avatar por defecto si no existe
  const avatarUrl = user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarUrl} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-chart-1">${saldoNumerico.toFixed(2)}</span>
                  <span className="text-muted-foreground">{user.creditos ?? 0} créditos</span>
                </div>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarUrl} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Saldo y créditos */}
            <div className="px-2 py-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <IconWallet className="size-4" />
                  Saldo
                </span>
                <span className="font-medium text-chart-1">
                  ${saldoNumerico.toFixed(2)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <IconCoin className="size-4" />
                  Créditos
                </span>
                <span className="font-medium">{user.creditos ?? 0}</span>
              </div>
            </div>
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={`/usuario/perfil/${user.name}`}>
                  <IconUserCircle />
                  Mi Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/torneos/mis-torneos">
                  <IconTrophy />
                  Mis Torneos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/usuario/equipo">
                  <IconUsers />
                  Mi Equipo
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/usuario/configuracion/personal">
                  <IconSettings />
                  Configuración
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={handleLogout}
            >
              <IconLogout />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
