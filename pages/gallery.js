import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import GalleryPage from "../components/GalleryPage";

export default function Gallery() {
  return (
    <div>
      <Head>
        <title>Galería</title>
      </Head>

      <Header />

      <Nav />

      <GalleryPage />
    </div>
  );
}
