import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>My ecommerce</title>
        <meta name="description" content="Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <img
        src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8"
        alt=""
        style={{ height: "700px", width: "100%" }}
      />
      <Footer></Footer>
    </div>
  );
}
