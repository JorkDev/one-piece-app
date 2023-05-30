import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import AnimePage from "../components/AnimePage";

export default function Seasons() {
    return (
        <div>
          <Head>
            <title>Episodios</title>
          </Head>
    
          <Header />
    
          <Nav />
    
          <AnimePage />
          
        </div>
      );
  }