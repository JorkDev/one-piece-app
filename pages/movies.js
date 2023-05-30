import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import MoviePage from "@/components/MoviePage";

export default function Movies() {
    return (
        <div>
          <Head>
            <title>Películas</title>
          </Head>
    
          <Header />
    
          <Nav />
    
          <MoviePage />
          
        </div>
      );
  }