import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>My ecommerce</title>
        <meta name="description" content="Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8"
        alt=""
        style={{ height: "700px", width: "100%" }}
      />
    </div>
  );
}
