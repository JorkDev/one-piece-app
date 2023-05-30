import {
  HomeIcon,
  BookOpenIcon,
  FilmIcon,
  TvIcon,
  UserIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import HeaderItem from "./HeaderItem";
import Link from "next/link";

function Header() {
  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <Link href="/">
          <HeaderItem title={"INICIO"} Icon={HomeIcon} />
        </Link>
        <Link href="/manga">
          <HeaderItem title="MANGA" Icon={BookOpenIcon} />
        </Link>
        <Link href="/movies">
          <HeaderItem title="PELÍCULAS" Icon={FilmIcon} />
        </Link>
        <Link href="/episodes">
          <HeaderItem title="EPISODIOS" Icon={TvIcon} />
        </Link>
        <Link href="/characters">
          <HeaderItem title="PERSONAJES" Icon={UserIcon} />
        </Link>
        <Link href="/news">
          <HeaderItem title="NOVEDADES" Icon={NewspaperIcon} />
        </Link>
      </div>

      <Image
        className="object-contain"
        src="/logo.png"
        width={200}
        height={200}
        alt="Picture of the author"
      />
    </header>
  );
}

export default Header;
