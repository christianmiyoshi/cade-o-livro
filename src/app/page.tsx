"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/collections');
  }, [router]);

  return null; // Não renderiza nada, apenas redireciona
}