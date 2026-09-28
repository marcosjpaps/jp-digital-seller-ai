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
    // Auth page is always allowed
    if (pathname === '/auth') {
      setAuthorized(true);
      setChecking(false);
      return;
    }

    const user = store.getCurrentUser();
    if (!user) {
      setAuthorized(false);
      setChecking(false);
      router.push('/auth');
    } else {
      setAuthorized(true);
      setChecking(false);
    }
  }, [pathname, router]);

  if (checking || (!authorized && pathname !== '/auth')) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-9 h-9 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-gray-400 font-mono tracking-wide">
          Acesso restrito. Redirecionando para login...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
