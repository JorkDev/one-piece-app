import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import HomePage from "../components/Home";

export default function Home() {
  return (
    <div>
      <Head>
        <title>One Piece App</title>
      </Head>

      <Header />

      <Nav />

      <HomePage />
      
    </div>
  );
}
