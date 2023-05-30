import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import NewsPage from "@/components/NewsPage";

export default function News() {
    return (
        <div>
          <Head>
            <title>Novedades</title>
          </Head>
    
          <Header />
    
          <Nav />
    
          <NewsPage />
          
        </div>
      );
  }