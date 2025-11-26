"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IconDeviceGamepad2 } from "@tabler/icons-react";

// Tipos para la integración futura con la API
export interface Juego {
  id: string;
  nombre: string;
  imagen?: string;
  torneosActivos: number;
  jugadores: number;
  color: string;
}

// Mock data - será reemplazado por la API
const juegosMock: Juego[] = [
  {
    id: "1",
    nombre: "Call of Duty: Warzone",
    torneosActivos: 12,
    jugadores: 2500,
    color: "from-orange-500 to-red-600",
  },
  {
    id: "2",
    nombre: "League of Legends",
    torneosActivos: 8,
    jugadores: 4200,
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "3",
    nombre: "Valorant",
    torneosActivos: 15,
    jugadores: 3800,
    color: "from-red-500 to-pink-600",
  },
  {
    id: "4",
    nombre: "EA FC 25",
    torneosActivos: 6,
    jugadores: 1800,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "5",
    nombre: "Counter-Strike 2",
    torneosActivos: 10,
    jugadores: 3200,
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "6",
    nombre: "Fortnite",
    torneosActivos: 18,
    jugadores: 5000,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "7",
    nombre: "Apex Legends",
    torneosActivos: 7,
    jugadores: 2100,
    color: "from-red-600 to-rose-600",
  },
  {
    id: "8",
    nombre: "Rocket League",
    torneosActivos: 5,
    jugadores: 1500,
    color: "from-cyan-500 to-blue-600",
  },
];

interface GamesCarouselProps {
  juegos?: Juego[];
  isLoading?: boolean;
}

export function GamesCarousel({ juegos = juegosMock, isLoading = false }: GamesCarouselProps) {
  if (isLoading) {
    return (
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">Juegos Populares</h2>
            <p className="text-muted-foreground">Explora los juegos más competitivos de la plataforma</p>
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="min-w-[200px] animate-pulse">
                <div className="h-48 rounded-lg bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">Juegos Populares</h2>
          <p className="text-muted-foreground">Explora los juegos más competitivos de la plataforma</p>
        </div>
        
        <div className="mx-auto max-w-6xl px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            autoplay
            autoplayDelay={3000}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {juegos.map((juego) => (
                <CarouselItem 
                  key={juego.id} 
                  className="basis-1/2 pl-2 sm:basis-1/3 md:basis-1/4 md:pl-4 lg:basis-1/5"
                >
                  <Card className="group cursor-pointer overflow-hidden border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <CardContent className="relative flex aspect-[3/4] flex-col items-center justify-end p-0">
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${juego.color} opacity-90`} />
                      
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:20px_20px]" />
                      </div>
                      
                      {/* Icon */}
                      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                        <IconDeviceGamepad2 className="size-16 text-white/30 transition-all duration-300 group-hover:scale-110 group-hover:text-white/50" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-white md:text-base">
                          {juego.nombre}
                        </h3>
                        <div className="flex flex-col gap-0.5 text-xs text-white/70">
                          <span>{juego.torneosActivos} torneos activos</span>
                          <span>{juego.jugadores.toLocaleString()} jugadores</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-muted-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-background" />
            <CarouselNext className="border-muted-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-background" />
          </Carousel>
        </div>
        
        {/* Dots indicator */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="text-center text-xs text-muted-foreground">
            Desliza para ver más juegos
          </div>
        </div>
      </div>
    </section>
  );
}
