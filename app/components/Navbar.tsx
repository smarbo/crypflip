import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky z-[99] top-0 w-full bg-background h-16 flex-row flex items-center justify-between border-solid border-b-gray-500 border-b-2">
      {/*change max-w for changing banner width*/}
      <Link href={"/"} className="max-w-[160px] ml-5">
        <Image src="/banner.svg" alt="Crypflip banner" width={100000000} height={100000000} ></Image>
      </Link>
      <div className="mr-16">
        <button className="bg-accent hover:bg-primary rounded-md px-3 py-2 text-text text-sm">Connect</button>
      </div>
    </div >
  )
}
