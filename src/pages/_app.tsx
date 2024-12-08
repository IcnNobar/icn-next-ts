import "@/styles/globals.css"; // Import global styles
import type { AppProps } from "next/app"; // Type for AppProps
import Layout from "@/components/layout"; // Import Layout component
import { TranslationProvider } from "@/context/localContext"; // Import the correct TranslationProvider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TranslationProvider>
  );
}
