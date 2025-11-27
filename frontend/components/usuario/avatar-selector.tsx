"use client";

import { useState, useEffect, useMemo } from "react";
import {
  IconLoader2,
  IconCrown,
  IconLock,
  IconCheck,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  obtenerCatalogoAvatares,
  obtenerMembresiaUsuario,
  type CatalogoAvatar,
  type MembresiaUsuario,
} from "@/lib/api/configuracion";
import { cn } from "@/lib/utils";

interface AvatarSelectorProps {
  currentAvatarUrl?: string | null;
  currentAvatarId?: string | null;
  onSelect: (avatarId: string, avatarUrl: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function AvatarSelector({
  currentAvatarUrl,
  currentAvatarId,
  onSelect,
  disabled = false,
  children,
}: AvatarSelectorProps) {
  const [open, setOpen] = useState(false);
  const [avatares, setAvatares] = useState<CatalogoAvatar[]>([]);
  const [membresia, setMembresia] = useState<MembresiaUsuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(
    currentAvatarId ?? null
  );

  // Cargar avatares y membresía cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      loadData();
      setSelectedAvatarId(currentAvatarId ?? null);
    }
  }, [open, currentAvatarId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [avataresData, membresiaData] = await Promise.all([
        obtenerCatalogoAvatares(),
        obtenerMembresiaUsuario(),
      ]);
      // Filtrar solo avatares disponibles y que tengan una URL válida
      const avataresValidos = avataresData.filter(
        (a) => a.disponible && a.url && a.url.startsWith('http')
      );
      setAvatares(avataresValidos);
      setMembresia(membresiaData);
    } catch (error) {
      console.error("Error cargando avatares:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener categorías únicas
  const categorias = useMemo(() => {
    const cats = new Set(avatares.map((a) => a.categoria));
    return ["todos", ...Array.from(cats).sort()];
  }, [avatares]);

  // Filtrar avatares
  const avataresFiltrados = useMemo(() => {
    return avatares.filter((avatar) => {
      const matchesSearch =
        searchQuery === "" ||
        avatar.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        avatar.seed.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "todos" || avatar.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [avatares, searchQuery, selectedCategory]);

  // Separar avatares en disponibles y premium bloqueados
  const { avataresDisponibles, avataresPremiumBloqueados } = useMemo(() => {
    const esPremium = membresia?.tiene_membresia ?? false;
    
    return {
      avataresDisponibles: avataresFiltrados.filter(
        (a) => !a.premium || esPremium
      ),
      avataresPremiumBloqueados: avataresFiltrados.filter(
        (a) => a.premium && !esPremium
      ),
    };
  }, [avataresFiltrados, membresia]);

  const handleSelect = (avatar: CatalogoAvatar) => {
    const esPremium = membresia?.tiene_membresia ?? false;
    
    // No permitir seleccionar avatares premium si no tiene membresía
    if (avatar.premium && !esPremium) {
      return;
    }
    
    setSelectedAvatarId(avatar.id);
  };

  const handleConfirm = () => {
    if (selectedAvatarId) {
      const avatar = avatares.find((a) => a.id === selectedAvatarId);
      if (avatar) {
        onSelect(avatar.id, avatar.url);
        setOpen(false);
      }
    }
  };

  const esPremium = membresia?.tiene_membresia ?? false;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        {children || (
          <Button variant="outline" size="sm" disabled={disabled}>
            Cambiar avatar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] p-4 sm:p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2 text-lg">
            Seleccionar Avatar
            {esPremium && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-black text-xs">
                <IconCrown className="size-3 mr-1" />
                Premium
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-sm">
            Elige un avatar para tu perfil.{" "}
            {!esPremium && (
              <span className="text-amber-500">
                Obtén membresía Premium para acceder a todos.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <IconLoader2 className="size-8 animate-spin text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">
              Cargando avatares...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Búsqueda */}
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar avatar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <IconX className="size-4" />
                </button>
              )}
            </div>

            {/* Filtro de categorías - scrollable en móvil */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-full transition-colors whitespace-nowrap shrink-0",
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  )}
                >
                  {cat === "todos" ? "Todos" : cat}
                </button>
              ))}
            </div>

            {/* Grid de avatares */}
            <div className="h-[40vh] sm:h-[45vh] overflow-y-auto border rounded-lg p-2 sm:p-3">
              <div className="space-y-4">
                {/* Avatares disponibles */}
                {avataresDisponibles.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium mb-2 text-muted-foreground sticky top-0 bg-background py-1 z-10">
                      {esPremium
                        ? `Disponibles (${avataresDisponibles.length})`
                        : `Gratuitos (${avataresDisponibles.length})`}
                    </h4>
                    <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-1.5 sm:gap-2">
                      {avataresDisponibles.map((avatar) => (
                        <AvatarItem
                          key={avatar.id}
                          avatar={avatar}
                          isSelected={selectedAvatarId === avatar.id}
                          isCurrent={currentAvatarId === avatar.id}
                          onSelect={handleSelect}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Avatares premium bloqueados */}
                {avataresPremiumBloqueados.length > 0 && !esPremium && (
                  <div>
                    <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5 text-amber-500 sticky top-0 bg-background py-1 z-10">
                      <IconCrown className="size-3" />
                      Premium ({avataresPremiumBloqueados.length})
                    </h4>
                    <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-1.5 sm:gap-2">
                      {avataresPremiumBloqueados.map((avatar) => (
                        <AvatarItem
                          key={avatar.id}
                          avatar={avatar}
                          isSelected={false}
                          isCurrent={false}
                          onSelect={handleSelect}
                          locked
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sin resultados */}
                {avataresFiltrados.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <p className="text-sm">No se encontraron avatares</p>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("todos");
                      }}
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleConfirm}
                disabled={!selectedAvatarId || selectedAvatarId === currentAvatarId}
              >
                Confirmar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Componente individual de avatar
interface AvatarItemProps {
  avatar: CatalogoAvatar;
  isSelected: boolean;
  isCurrent: boolean;
  onSelect: (avatar: CatalogoAvatar) => void;
  locked?: boolean;
}

function AvatarItem({
  avatar,
  isSelected,
  isCurrent,
  onSelect,
  locked = false,
}: AvatarItemProps) {
  const [imageError, setImageError] = useState(false);

  // Si la imagen falla al cargar, no mostrar este avatar
  if (imageError) {
    return null;
  }

  const content = (
    <button
      onClick={() => !locked && onSelect(avatar)}
      disabled={locked}
      className={cn(
        "relative group p-1 rounded-lg transition-all",
        "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        isSelected && "bg-primary/20 ring-2 ring-primary",
        isCurrent && !isSelected && "bg-accent",
        locked && "opacity-40 cursor-not-allowed hover:bg-transparent"
      )}
    >
      <div className="relative">
        <img
          src={avatar.url}
          alt={avatar.nombre}
          className="size-10 sm:size-11 rounded-md object-cover bg-muted"
          onError={() => setImageError(true)}
          loading="lazy"
        />

        {/* Indicador de selección */}
        {isSelected && (
          <div className="absolute -bottom-0.5 -right-0.5 size-4 rounded-full bg-primary flex items-center justify-center">
            <IconCheck className="size-2.5 text-primary-foreground" />
          </div>
        )}

        {/* Indicador de premium/bloqueado */}
        {avatar.premium && (
          <div className="absolute -top-0.5 -right-0.5">
            {locked ? (
              <div className="size-4 rounded-full bg-amber-500/80 flex items-center justify-center">
                <IconLock className="size-2.5 text-black" />
              </div>
            ) : (
              <div className="size-4 rounded-full bg-amber-500 flex items-center justify-center">
                <IconCrown className="size-2.5 text-black" />
              </div>
            )}
          </div>
        )}

        {/* Indicador de avatar actual */}
        {isCurrent && !isSelected && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            <span className="text-[8px] bg-muted px-1 rounded text-muted-foreground whitespace-nowrap">
              Actual
            </span>
          </div>
        )}
      </div>
    </button>
  );

  if (locked) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            <p className="flex items-center gap-1">
              <IconCrown className="size-3 text-amber-500" />
              Requiere Premium
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

export default AvatarSelector;
