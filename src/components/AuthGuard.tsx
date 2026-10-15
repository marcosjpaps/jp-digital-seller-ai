'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { store } from '@/lib/store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === '/auth') {
      setAuthorized(true);
      setChecking(false);
      return;
    }
    let cancelled = false;
    setChecking(true);
    fetch('/api/auth/me', { cache: 'no-store', credentials: 'same-origin' })
      .then(async response => {
        if (!response.ok) throw Error('unauthorized');
        const data = await response.json();
        if (!data.authenticated || !data.user) throw Error('unauthorized');
        if (!cancelled) {
          store.setCurrentUser(data.user);
          setAuthorized(true);
          setChecking(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          store.logout();
          setAuthorized(false);
          setChecking(false);
          router.replace('/auth');
        }
      });
    return () => { cancelled = true; };
  }, [pathname, router]);

  if (checking || (!authorized && pathname !== '/auth')) {
    return <div className="min-h-[70vh] flex items-center justify-center text-sm text-gray-400">Verificando sessão segura...</div>;
  }
  return <>{children}</>;
}
