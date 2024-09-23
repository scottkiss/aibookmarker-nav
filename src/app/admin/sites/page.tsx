"use client";

// src/app/admin/page.tsx

import AdminComponent from '@/components/adminComponent';
import { SessionProvider } from 'next-auth/react';

export default async function Home() {
  return(
  <SessionProvider>
    <AdminComponent></AdminComponent>
  </SessionProvider>
  )
}


