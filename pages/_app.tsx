import "../styles/styles.css";
import "../styles/styles2.css";
import "../styles/styles3.css";
import "@biconomy/web3-auth/dist/src/style.css";

import type { AppProps } from "next/app";

import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
