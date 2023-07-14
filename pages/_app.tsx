import "../styles/styles.css";
import "../styles/styles2.css";
import type { AppProps } from "next/app";
// import { Inter } from '@next/font/google'
// import '@biconomy/web3-auth/dist/src/style.css'
import Head from "next/head";

// const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
