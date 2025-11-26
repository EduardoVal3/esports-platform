import { HeroSection } from "@/components/home/hero-section";
import { ActionCards } from "@/components/home/action-cards";
import { UpcomingTournaments } from "@/components/home/upcoming-tournaments";
import { GamesCarousel } from "@/components/home/games-carousel";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/home/app-sidebar";

export default function Home() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <HeroSection />
            
            {/* Action Cards */}
            <ActionCards />
            
            {/* Upcoming Tournaments */}
            <UpcomingTournaments />
            
            {/* Games Carousel */}
            <GamesCarousel />
          </main>
          
          {/* Footer */}
          <SiteFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
