'use client';

import { usePathname } from 'next/navigation';
import { MainSidebar } from './main-sidebar';
import { Footer } from './ui/footer';

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isDashboard = pathname.startsWith('/dashboard');
  const isUserConfig = pathname.startsWith('/usuario/configuracion');
  const shouldHideLayout = isDashboard || isUserConfig;

  if (shouldHideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <MainSidebar />
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
