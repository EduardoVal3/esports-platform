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
import { useUsuarioActual } from "@/hooks/use-usuario-actual"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { logout } = useAuth()
  const router = useRouter()
  const { usuario, isLoading } = useUsuarioActual()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="animate-pulse">
            <div className="h-8 w-8 rounded-lg bg-muted" />
            <div className="grid flex-1 gap-1">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-3 w-16 rounded bg-muted" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  if (!usuario) {
    return null
  }

  // Parsear saldo a número de forma segura
  const saldoNumerico = typeof usuario.saldo === 'string' 
    ? parseFloat(usuario.saldo) 
    : (usuario.saldo ?? 0)
  
  // Avatar por defecto si no existe
  const avatarUrl = usuario.avatar?.url || `https://api.dicebear.com/7.x/bottts/svg?seed=${usuario.nickname}`

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
                <AvatarImage src={avatarUrl} alt={usuario.nickname} />
                <AvatarFallback className="rounded-lg">
                  {usuario.nickname.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{usuario.nickname}</span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-chart-1">${saldoNumerico.toFixed(2)}</span>
                  <span className="text-muted-foreground">{usuario.creditos ?? 0} créditos</span>
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
                  <AvatarImage src={avatarUrl} alt={usuario.nickname} />
                  <AvatarFallback className="rounded-lg">
                    {usuario.nickname.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{usuario.nickname}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {usuario.persona.correo}
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
                <span className="font-medium">{usuario.creditos ?? 0}</span>
              </div>
            </div>
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={`/usuario/perfil/${usuario.nickname}`}>
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
