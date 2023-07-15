import dynamic from "next/dynamic";
import { Suspense } from "react";
import Head from "next/head";

const Index = () => {
  const SocialLoginDynamic = dynamic(
    () => import("../components/app").then((res) => res.default),
    {
      ssr: false,
    }
  );

  return (
    <div>
      <Head>
        <title>Pixie Purse</title>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <SocialLoginDynamic />
      </Suspense>
    </div>
  );
};

export default Index;
