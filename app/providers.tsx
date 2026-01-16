"use client"

import { ConfigProvider } from "@/lib/config-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <ConfigProvider>{children}</ConfigProvider>
}
