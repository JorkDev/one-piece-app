import Image from "next/image"

function Header() {
  return (
    <header className="">
        <h1>This is the header</h1>
        <Image
        src="/logo.png"
        width={200}
        height={200}
        alt="Picture of the author"
      />
    </header>
  )
}

export default Header