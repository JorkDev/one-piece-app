import {
  HomeIcon,
  BookOpenIcon,
  FilmIcon,
  TvIcon,
  UserIcon,
  NewspaperIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import HeaderItem from "./HeaderItem";

function Header() {
  return (
    <header className="">
      <div>
        <HeaderItem title="INICIO" Icon={HomeIcon} />
        <HeaderItem title="MANGA" Icon={BookOpenIcon} />
        <HeaderItem title="PELÍCULAS" Icon={FilmIcon} />
        <HeaderItem title="TEMPORADAS" Icon={TvIcon} />
        <HeaderItem title="PERSONAJES" Icon={UserIcon} />
        <HeaderItem title="NOVEDADES" Icon={NewspaperIcon} />
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
