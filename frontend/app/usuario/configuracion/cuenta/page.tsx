"use client";

import { useState, useEffect } from "react";
import {
  IconDeviceFloppy,
  IconX,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconShield,
  IconAlertTriangle,
  IconCheck,
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
import { SiteHeader } from "@/components/usuario/site-header";
import { Badge } from "@/components/ui/badge";

interface AccountData {
  email: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Datos mock del usuario actual
const mockAccountData: AccountData = {
  email: "jugador1@example.com",
};

export default function CuentaPage() {
  const [accountData, setAccountData] = useState<AccountData>(mockAccountData);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasPasswordChanges, setHasPasswordChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Simular obtención de datos del usuario desde API
    // En producción, esto vendría de un endpoint con el JWT
    setAccountData(mockAccountData);
  }, []);

  useEffect(() => {
    // Calcular fuerza de la contraseña
    const password = passwordData.newPassword;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    setPasswordStrength(strength);
  }, [passwordData.newPassword]);

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasPasswordChanges(true);
  };

  const handleSavePassword = async () => {
    // Validaciones
    if (!passwordData.currentPassword) {
      alert("Debes ingresar tu contraseña actual");
      return;
    }

    if (!passwordData.newPassword) {
      alert("Debes ingresar una nueva contraseña");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      alert("La nueva contraseña debe ser diferente a la actual");
      return;
    }

    setIsSaving(true);

    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Contraseña actualizada");
    setIsSaving(false);
    setHasPasswordChanges(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    alert("Contraseña actualizada exitosamente");

    // En producción: hacer PUT/PATCH a la API con JWT
    // const response = await fetch('/api/usuario/cambiar-password', {
    //   method: 'PATCH',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     currentPassword: passwordData.currentPassword,
    //     newPassword: passwordData.newPassword
    //   })
    // });
  };

  const handleCancelPassword = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setHasPasswordChanges(false);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Muy débil";
    if (passwordStrength === 1) return "Débil";
    if (passwordStrength === 2) return "Regular";
    if (passwordStrength === 3) return "Buena";
    if (passwordStrength === 4) return "Fuerte";
    return "Muy fuerte";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const passwordsMatch =
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    passwordData.newPassword === passwordData.confirmPassword;

  const passwordsDontMatch =
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    passwordData.newPassword !== passwordData.confirmPassword;

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
                  Cuenta
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Administra tu correo electrónico y seguridad de la cuenta
                </p>
              </div>
            </div>

            {/* Información del correo electrónico */}
            <div className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconMail className="size-5" />
                    Correo Electrónico
                  </CardTitle>
                  <CardDescription>
                    Tu correo electrónico asociado a la cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <div className="flex flex-col gap-2 md:flex-row">
                        <Input
                          id="email"
                          type="email"
                          value={accountData.email}
                          disabled
                          className="flex-1 font-medium"
                        />
                        <Button variant="outline" disabled className="md:w-auto">
                          Cambiar correo
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        El correo electrónico no se puede modificar actualmente.
                        Contacta a soporte si necesitas cambiarlo.
                      </p>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
                      <div className="rounded-full bg-green-500/10 p-2">
                        <IconCheck className="size-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Correo verificado
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tu correo electrónico ha sido verificado exitosamente
                        </p>
                      </div>
                      <Badge variant="outline" className="border-green-500/50 text-green-500">
                        Verificado
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cambio de contraseña */}
            <div className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconLock className="size-5" />
                    Cambiar Contraseña
                  </CardTitle>
                  <CardDescription>
                    Actualiza tu contraseña para mantener tu cuenta segura
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    {/* Contraseña actual */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="current-password">
                        Contraseña actual
                        <span className="ml-1 text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            handlePasswordChange("currentPassword", e.target.value)
                          }
                          placeholder="Ingresa tu contraseña actual"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 size-10 hover:bg-transparent"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <IconEyeOff className="size-4 text-muted-foreground" />
                          ) : (
                            <IconEye className="size-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Nueva contraseña */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="new-password">
                        Nueva contraseña
                        <span className="ml-1 text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            handlePasswordChange("newPassword", e.target.value)
                          }
                          placeholder="Ingresa tu nueva contraseña"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 size-10 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <IconEyeOff className="size-4 text-muted-foreground" />
                          ) : (
                            <IconEye className="size-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>

                      {/* Indicador de fuerza de contraseña */}
                      {passwordData.newPassword && (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Fuerza de la contraseña:
                            </span>
                            <span className="text-xs font-medium">
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`h-1 flex-1 rounded-full ${
                                  level <= passwordStrength
                                    ? getPasswordStrengthColor()
                                    : "bg-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="confirm-password">
                        Confirmar nueva contraseña
                        <span className="ml-1 text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            handlePasswordChange("confirmPassword", e.target.value)
                          }
                          placeholder="Confirma tu nueva contraseña"
                          className={`pr-10 ${
                            passwordsDontMatch ? "border-destructive/50" : ""
                          } ${passwordsMatch ? "border-green-500/50" : ""}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 size-10 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <IconEyeOff className="size-4 text-muted-foreground" />
                          ) : (
                            <IconEye className="size-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>

                      {passwordsDontMatch && (
                        <p className="text-xs text-destructive">
                          Las contraseñas no coinciden
                        </p>
                      )}
                      {passwordsMatch && (
                        <p className="text-xs text-green-500">
                          Las contraseñas coinciden
                        </p>
                      )}
                    </div>

                    {/* Requisitos de contraseña */}
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="mb-2 text-sm font-medium">
                        Requisitos de contraseña:
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <div
                            className={`size-1.5 rounded-full ${
                              passwordData.newPassword.length >= 8
                                ? "bg-green-500"
                                : "bg-muted-foreground"
                            }`}
                          />
                          Mínimo 8 caracteres
                        </li>
                        <li className="flex items-center gap-2">
                          <div
                            className={`size-1.5 rounded-full ${
                              /[a-z]/.test(passwordData.newPassword) &&
                              /[A-Z]/.test(passwordData.newPassword)
                                ? "bg-green-500"
                                : "bg-muted-foreground"
                            }`}
                          />
                          Mayúsculas y minúsculas
                        </li>
                        <li className="flex items-center gap-2">
                          <div
                            className={`size-1.5 rounded-full ${
                              /\d/.test(passwordData.newPassword)
                                ? "bg-green-500"
                                : "bg-muted-foreground"
                            }`}
                          />
                          Al menos un número
                        </li>
                        <li className="flex items-center gap-2">
                          <div
                            className={`size-1.5 rounded-full ${
                              /[^A-Za-z0-9]/.test(passwordData.newPassword)
                                ? "bg-green-500"
                                : "bg-muted-foreground"
                            }`}
                          />
                          Al menos un carácter especial (!@#$%^&*)
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Seguridad adicional */}
            <div className="px-4 lg:px-6">
              <Card className="border-blue-500/20 bg-blue-500/5">
                <CardContent className="flex gap-3 pt-6">
                  <div className="rounded-full bg-blue-500/10 p-2">
                    <IconShield className="size-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Mantén tu cuenta segura</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Una contraseña fuerte es esencial para proteger tu cuenta. Te
                      recomendamos usar una combinación de letras mayúsculas y
                      minúsculas, números y caracteres especiales. Nunca compartas tu
                      contraseña con nadie y evita usar la misma contraseña en
                      múltiples sitios.
                    </p>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm font-medium text-blue-500">
                        Recomendaciones:
                      </p>
                      <ul className="ml-4 list-disc space-y-0.5 text-sm text-muted-foreground">
                        <li>Usa una contraseña única para esta cuenta</li>
                        <li>Cambia tu contraseña periódicamente</li>
                        <li>No uses información personal obvia</li>
                        <li>Considera usar un gestor de contraseñas</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advertencia de seguridad */}
            {hasPasswordChanges && (
              <div className="px-4 lg:px-6">
                <Card className="border-yellow-500/20 bg-yellow-500/5">
                  <CardContent className="flex gap-3 pt-6">
                    <div className="rounded-full bg-yellow-500/10 p-2">
                      <IconAlertTriangle className="size-5 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-yellow-500">
                        Importante
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Al cambiar tu contraseña, serás desconectado de todos tus
                        dispositivos y tendrás que iniciar sesión nuevamente con tu
                        nueva contraseña.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Botones de acción */}
            {hasPasswordChanges && (
              <div className="sticky bottom-4 px-4 lg:px-6">
                <Card className="border-primary/50 bg-card/95 backdrop-blur-sm">
                  <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium">
                      ¿Deseas cambiar tu contraseña?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleCancelPassword}
                        disabled={isSaving}
                        className="flex-1 sm:flex-none"
                      >
                        <IconX className="size-4" />
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleSavePassword}
                        disabled={isSaving || !passwordsMatch}
                        className="flex-1 sm:flex-none"
                      >
                        <IconDeviceFloppy className="size-4" />
                        {isSaving ? "Guardando..." : "Cambiar contraseña"}
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
