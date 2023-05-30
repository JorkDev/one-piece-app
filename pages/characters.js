import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import CharacterGallery from "../components/CharacterPage";

export default function Characters() {
  return (
    <div>
      <Head>
        <title>Characters</title>
      </Head>

      <Header />

      <Nav />

      <CharacterGallery />
    </div>
  );
}
