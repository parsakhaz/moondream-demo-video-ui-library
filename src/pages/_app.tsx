"use client";

import type { AppProps } from "next/app";
import { ComponentsProvider } from "@/context/ComponentsContext";
import { ConfigProvider } from "@/context/ConfigContext";
import ClientOnly from "@/components/ClientOnly";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientOnly>
      <ConfigProvider>
        <ComponentsProvider>
          <Component {...pageProps} />
        </ComponentsProvider>
      </ConfigProvider>
    </ClientOnly>
  );
}
