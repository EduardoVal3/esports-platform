'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfiguracionPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to personal settings as default
    router.replace('/usuario/configuracion/personal');
  }, [router]);

  return null;
}
