"use client";

import { useState, useEffect } from "react";
import {
  IconDeviceFloppy,
  IconX,
  IconPlus,
  IconTrash,
  IconDeviceGamepad2,
  IconBrandXbox,
  IconPlaystationX,
  IconBrandSteam,
  IconDeviceDesktop,
  IconInfoCircle,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteHeader } from "@/components/usuario/site-header";
import { Badge } from "@/components/ui/badge";

interface GameAccount {
  id: string;
  plataforma: string;
  identificador: string;
}

// Plataformas de juego disponibles según context.txt
const gamePlatforms = [
  {
    value: "PlayStation",
    label: "PlayStation Network",
    icon: IconPlaystationX,
    color: "text-blue-500",
    placeholder: "Tu PSN ID",
    description: "ID de PlayStation Network",
  },
  {
    value: "Xbox",
    label: "Xbox Live",
    icon: IconBrandXbox,
    color: "text-green-500",
    placeholder: "Tu Gamertag",
    description: "Gamertag de Xbox Live",
  },
  {
    value: "PC",
    label: "Steam",
    icon: IconBrandSteam,
    color: "text-slate-400",
    placeholder: "Tu Steam ID",
    description: "Steam ID o nombre de usuario",
  },
  {
    value: "Epic",
    label: "Epic Games",
    icon: IconDeviceDesktop,
    color: "text-gray-400",
    placeholder: "Tu Epic ID",
    description: "Epic Games Display Name",
  },
  {
    value: "Activision",
    label: "Activision ID",
    icon: IconDeviceGamepad2,
    color: "text-orange-500",
    placeholder: "Tu Activision ID",
    description: "Activision ID (Call of Duty)",
  },
  {
    value: "Riot",
    label: "Riot ID",
    icon: IconDeviceGamepad2,
    color: "text-red-500",
    placeholder: "Nombre#TAG",
    description: "Riot ID (League of Legends, Valorant)",
  },
  {
    value: "EA",
    label: "EA ID",
    icon: IconDeviceGamepad2,
    color: "text-blue-400",
    placeholder: "Tu EA ID",
    description: "EA ID (FIFA, Apex Legends)",
  },
  {
    value: "Ubisoft",
    label: "Ubisoft Connect",
    icon: IconDeviceGamepad2,
    color: "text-indigo-500",
    placeholder: "Tu Ubisoft ID",
    description: "Ubisoft Connect Username",
  },
  {
    value: "Rogue",
    label: "Rogue Company ID",
    icon: IconDeviceGamepad2,
    color: "text-purple-500",
    placeholder: "Tu Rogue ID",
    description: "Rogue Company Player ID",
  },
  {
    value: "Movil",
    label: "Móvil (General)",
    icon: IconDeviceGamepad2,
    color: "text-pink-500",
    placeholder: "Tu ID de juego móvil",
    description: "ID de plataforma móvil",
  },
];

// Datos mock del usuario actual
const mockGameAccounts: GameAccount[] = [
  {
    id: "1",
    plataforma: "PlayStation",
    identificador: "jugador1_psn",
  },
  {
    id: "2",
    plataforma: "Xbox",
    identificador: "Jugador1",
  },
  {
    id: "3",
    plataforma: "Steam",
    identificador: "jugador1_steam",
  },
];

export default function GameConfigPage() {
  const [gameAccounts, setGameAccounts] = useState<GameAccount[]>(mockGameAccounts);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simular obtención de datos del usuario desde API
    // En producción, esto vendría de un endpoint con el JWT
    setGameAccounts(mockGameAccounts);
  }, []);

  const handleAddAccount = () => {
    const newAccount: GameAccount = {
      id: `new-${Date.now()}`,
      plataforma: "",
      identificador: "",
    };
    setGameAccounts([...gameAccounts, newAccount]);
    setHasChanges(true);
  };

  const handleRemoveAccount = (id: string) => {
    setGameAccounts(gameAccounts.filter((account) => account.id !== id));
    setHasChanges(true);
  };

  const handleUpdateAccount = (
    id: string,
    field: "plataforma" | "identificador",
    value: string
  ) => {
    setGameAccounts(
      gameAccounts.map((account) =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Filtrar cuentas vacías o incompletas
    const validAccounts = gameAccounts.filter(
      (account) => account.plataforma && account.identificador.trim()
    );

    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Cuentas guardadas:", validAccounts);
    setGameAccounts(validAccounts);
    setIsSaving(false);
    setHasChanges(false);

    // En producción: hacer PUT/PATCH a la API con JWT
    // const response = await fetch('/api/usuario/cuentas-juego', {
    //   method: 'PATCH',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(validAccounts)
    // });
  };

  const handleCancel = () => {
    setGameAccounts(mockGameAccounts);
    setHasChanges(false);
  };

  const getPlatformInfo = (platformValue: string) => {
    return gamePlatforms.find((p) => p.value === platformValue);
  };

  const getUsedPlatforms = () => {
    return gameAccounts.map((account) => account.plataforma).filter(Boolean);
  };

  const getAvailablePlatforms = (currentPlatform: string) => {
    const usedPlatforms = getUsedPlatforms();
    return gamePlatforms.filter(
      (platform) =>
        !usedPlatforms.includes(platform.value) ||
        platform.value === currentPlatform
    );
  };

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* Header de la página */}
            <div className="px-4 lg:px-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Cuentas de Juegos
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Vincula tus cuentas de diferentes plataformas para participar en
                  torneos
                </p>
              </div>
            </div>

            {/* Lista de cuentas de juego */}
            <div className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <IconDeviceGamepad2 className="size-5" />
                        Mis Cuentas de Juego
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Agrega los identificadores de tus cuentas en diferentes
                        plataformas
                      </CardDescription>
                    </div>
                    <Button
                      onClick={handleAddAccount}
                      size="sm"
                      className="w-full sm:w-auto"
                      disabled={gameAccounts.length >= gamePlatforms.length}
                    >
                      <IconPlus className="size-4" />
                      Agregar cuenta
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {gameAccounts.length === 0 ? (
                      <div className="flex flex-col items-center justify-center gap-4 py-12">
                        <div className="rounded-full bg-muted p-4">
                          <IconDeviceGamepad2 className="size-8 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">No hay cuentas agregadas</p>
                          <p className="text-sm text-muted-foreground">
                            Vincula tus cuentas de juego para participar en torneos
                          </p>
                        </div>
                        <Button onClick={handleAddAccount} variant="outline">
                          <IconPlus className="size-4" />
                          Agregar primera cuenta
                        </Button>
                      </div>
                    ) : (
                      gameAccounts.map((account, index) => {
                        const platformInfo = getPlatformInfo(account.plataforma);
                        const availablePlatforms = getAvailablePlatforms(
                          account.plataforma
                        );
                        const PlatformIcon = platformInfo?.icon || IconDeviceGamepad2;

                        return (
                          <div
                            key={account.id}
                            className="flex flex-col gap-4 rounded-lg border bg-card/50 p-4 transition-colors hover:bg-card/80"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`rounded-full bg-muted p-2 ${platformInfo?.color || "text-foreground"}`}
                                >
                                  <PlatformIcon className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">
                                    {platformInfo?.label || "Seleccionar plataforma"}
                                  </span>
                                  {platformInfo && (
                                    <span className="text-xs text-muted-foreground">
                                      {platformInfo.description}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveAccount(account.id)}
                                className="size-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                              >
                                <IconTrash className="size-4" />
                              </Button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              {/* Plataforma */}
                              <div className="flex flex-col gap-2">
                                <Label htmlFor={`platform-${account.id}`}>
                                  Plataforma
                                  <span className="ml-1 text-destructive">*</span>
                                </Label>
                                <Select
                                  value={account.plataforma}
                                  onValueChange={(value) =>
                                    handleUpdateAccount(
                                      account.id,
                                      "plataforma",
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger
                                    id={`platform-${account.id}`}
                                    className={
                                      !account.plataforma
                                        ? "border-destructive/50"
                                        : ""
                                    }
                                  >
                                    <SelectValue placeholder="Selecciona una plataforma" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availablePlatforms.map((platform) => {
                                      const Icon = platform.icon;
                                      return (
                                        <SelectItem
                                          key={platform.value}
                                          value={platform.value}
                                        >
                                          <div className="flex items-center gap-2">
                                            <Icon
                                              className={`size-4 ${platform.color}`}
                                            />
                                            <span>{platform.label}</span>
                                          </div>
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                                {!account.plataforma && (
                                  <p className="text-xs text-destructive">
                                    Selecciona una plataforma
                                  </p>
                                )}
                              </div>

                              {/* Identificador */}
                              <div className="flex flex-col gap-2">
                                <Label htmlFor={`identifier-${account.id}`}>
                                  Identificador
                                  <span className="ml-1 text-destructive">*</span>
                                </Label>
                                <Input
                                  id={`identifier-${account.id}`}
                                  value={account.identificador}
                                  onChange={(e) =>
                                    handleUpdateAccount(
                                      account.id,
                                      "identificador",
                                      e.target.value
                                    )
                                  }
                                  placeholder={
                                    platformInfo?.placeholder ||
                                    "Ingresa tu ID de usuario"
                                  }
                                  className={
                                    !account.identificador.trim()
                                      ? "border-destructive/50"
                                      : ""
                                  }
                                />
                                {!account.identificador.trim() && (
                                  <p className="text-xs text-destructive">
                                    Ingresa tu identificador
                                  </p>
                                )}
                                {platformInfo && account.plataforma === "Riot" && (
                                  <p className="text-xs text-muted-foreground">
                                    Formato: NombreDeUsuario#TAG (ejemplo: Player#NA1)
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Información adicional */}
            <div className="px-4 lg:px-6">
              <Card className="border-blue-500/20 bg-blue-500/5">
                <CardContent className="flex gap-3 pt-6">
                  <div className="rounded-full bg-blue-500/10 p-2">
                    <IconInfoCircle className="size-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      ¿Por qué vincular mis cuentas de juego?
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Vincular tus cuentas de juego te permite participar en torneos
                      específicos de cada plataforma. Los organizadores podrán
                      verificar tu identidad y contactarte directamente a través de
                      estos IDs. Asegúrate de que los identificadores sean correctos
                      para evitar problemas al registrarte en torneos.
                    </p>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm font-medium text-blue-500">
                        Consejos importantes:
                      </p>
                      <ul className="ml-4 list-disc space-y-0.5 text-sm text-muted-foreground">
                        <li>Verifica que tus IDs estén escritos correctamente</li>
                        <li>
                          Para Riot ID, usa el formato completo: Nombre#TAG
                        </li>
                        <li>
                          Puedes vincular múltiples plataformas según tus preferencias
                        </li>
                        <li>
                          Los IDs se mostrarán a los organizadores de torneos
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Guía rápida de plataformas */}
            <div className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Guía rápida de plataformas
                  </CardTitle>
                  <CardDescription>
                    Información sobre dónde encontrar tus IDs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      {
                        platform: "PlayStation Network",
                        info: "Configuración → Perfil → ID en línea",
                      },
                      {
                        platform: "Xbox Live",
                        info: "Mi perfil → Gamertag",
                      },
                      {
                        platform: "Steam",
                        info: "Perfil → Editar perfil → URL personalizada",
                      },
                      {
                        platform: "Epic Games",
                        info: "Cuenta → Información general → Nombre para mostrar",
                      },
                      {
                        platform: "Riot ID",
                        info: "Configuración → Riot ID (Nombre#TAG)",
                      },
                      {
                        platform: "EA / Activision",
                        info: "Revisa tu perfil en el juego correspondiente",
                      },
                    ].map((guide, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-1 rounded-lg border bg-muted/30 p-3"
                      >
                        <p className="text-sm font-medium">{guide.platform}</p>
                        <p className="text-xs text-muted-foreground">
                          {guide.info}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Botones de acción */}
            {hasChanges && (
              <div className="sticky bottom-4 px-4 lg:px-6">
                <Card className="border-primary/50 bg-card/95 backdrop-blur-sm">
                  <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium">
                      Tienes cambios sin guardar
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="flex-1 sm:flex-none"
                      >
                        <IconX className="size-4" />
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 sm:flex-none"
                      >
                        <IconDeviceFloppy className="size-4" />
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
