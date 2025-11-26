"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconTrophy, IconUsersGroup, IconMessages, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

const actionCards = [
  {
    title: "Organiza tu propio torneo",
    description: "Crea y administra torneos personalizados. Define reglas, premios y gestiona inscripciones fácilmente.",
    icon: IconTrophy,
    href: "/torneos/crear",
    color: "from-chart-1/20 to-chart-1/5",
    iconColor: "text-chart-1",
  },
  {
    title: "Crea un equipo",
    description: "Forma tu escuadra de campeones. Recluta jugadores, entrena y compite juntos en los mejores torneos.",
    icon: IconUsersGroup,
    href: "/equipos/crear",
    color: "from-chart-2/20 to-chart-2/5",
    iconColor: "text-chart-2",
  },
  {
    title: "Únete a nuestra comunidad",
    description: "Conecta con otros gamers, comparte estrategias y mantente al día con las últimas noticias de eSports.",
    icon: IconMessages,
    href: "/comunidad",
    color: "from-chart-4/20 to-chart-4/5",
    iconColor: "text-chart-4",
  },
];

export function ActionCards() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">Comienza tu aventura</h2>
          <p className="text-muted-foreground">Elige cómo quieres empezar en eSports Platform</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {actionCards.map((card) => (
            <Card 
              key={card.title} 
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              
              <CardHeader className="relative">
                <div className={`mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-background shadow-sm ${card.iconColor}`}>
                  <card.icon className="size-6" />
                </div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <CardDescription className="text-sm">{card.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <Button variant="ghost" className="group/btn gap-2 p-0 hover:bg-transparent" asChild>
                  <Link href={card.href}>
                    Comenzar
                    <IconArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
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
