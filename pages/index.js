import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>One Piece App</title>
      </Head>

      <Header />

      <Nav />
      {/* Results */}
    </div>
  );
}
