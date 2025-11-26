"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconTrophy, IconUsers, IconCalendar, IconArrowRight, IconCoin } from "@tabler/icons-react";
import Link from "next/link";

// Tipos para la integración futura con la API
export interface Torneo {
  id: string;
  titulo: string;
  juego: string;
  fechaInicio: string;
  cupoMaximo: number;
  inscritos: number;
  premio: number;
  estado: "abierto" | "en_curso" | "proximo";
  imagen?: string;
}

// Mock data - será reemplazado por la API
const torneosMock: Torneo[] = [
  {
    id: "1",
    titulo: "Call of Duty Championship",
    juego: "Call of Duty: Warzone",
    fechaInicio: "2025-12-01T18:00:00",
    cupoMaximo: 64,
    inscritos: 48,
    premio: 500,
    estado: "abierto",
  },
  {
    id: "2",
    titulo: "League of Legends Open",
    juego: "League of Legends",
    fechaInicio: "2025-12-05T20:00:00",
    cupoMaximo: 32,
    inscritos: 28,
    premio: 1000,
    estado: "abierto",
  },
  {
    id: "3",
    titulo: "Valorant Pro Series",
    juego: "Valorant",
    fechaInicio: "2025-12-10T19:00:00",
    cupoMaximo: 16,
    inscritos: 12,
    premio: 750,
    estado: "proximo",
  },
  {
    id: "4",
    titulo: "FIFA Ultimate Cup",
    juego: "EA FC 25",
    fechaInicio: "2025-12-15T17:00:00",
    cupoMaximo: 128,
    inscritos: 89,
    premio: 2000,
    estado: "proximo",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getEstadoBadge(estado: Torneo["estado"]) {
  switch (estado) {
    case "abierto":
      return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Inscripciones Abiertas</Badge>;
    case "en_curso":
      return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">En Curso</Badge>;
    case "proximo":
      return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Próximamente</Badge>;
  }
}

interface UpcomingTournamentsProps {
  torneos?: Torneo[];
  isLoading?: boolean;
}

export function UpcomingTournaments({ torneos = torneosMock, isLoading = false }: UpcomingTournamentsProps) {
  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold md:text-3xl">Próximos Torneos</h2>
              <p className="text-muted-foreground">Inscríbete y compite por increíbles premios</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 w-20 rounded bg-muted" />
                  <div className="h-6 w-full rounded bg-muted" />
                  <div className="h-4 w-32 rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-muted" />
                    <div className="h-4 w-full rounded bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">Próximos Torneos</h2>
            <p className="text-muted-foreground">Inscríbete y compite por increíbles premios</p>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/torneos">
              Ver todos
              <IconArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {torneos.map((torneo) => (
            <Card 
              key={torneo.id} 
              className="group transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader className="pb-3">
                {getEstadoBadge(torneo.estado)}
                <CardTitle className="mt-2 line-clamp-1 text-lg">{torneo.titulo}</CardTitle>
                <CardDescription className="line-clamp-1">{torneo.juego}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconCalendar className="size-4" />
                  <span>{formatDate(torneo.fechaInicio)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconUsers className="size-4" />
                  <span>{torneo.inscritos}/{torneo.cupoMaximo} jugadores</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-medium text-chart-1">
                  <IconCoin className="size-4" />
                  <span>${torneo.premio} en premios</span>
                </div>
                
                {/* Progress bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div 
                    className="h-full bg-gradient-to-r from-chart-1 to-chart-2 transition-all duration-500"
                    style={{ width: `${(torneo.inscritos / torneo.cupoMaximo) * 100}%` }}
                  />
                </div>
                
                <Button className="mt-2 w-full gap-2" size="sm" asChild>
                  <Link href={`/torneos/${torneo.id}`}>
                    <IconTrophy className="size-4" />
                    Inscribirse
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
