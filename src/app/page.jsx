"use server";

import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 h-screen w-screen">
      <Link
        href="/womenswear"
        className="text-xl flex flex-col items-center justify-center group"
      >
        <div className="relative w-screen md:w-[50vw] h-[50vh] md:h-screen overflow-hidden">
          <Image
            src="/womenswear.jpg"
            alt="womenswear"
            fill
            className="select-none object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
          <h1 className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold select-none transition-transform duration-500 group-hover:scale-95">
            womenswear
          </h1>
        </div>
      </Link>
      <Link
        href="/menswear"
        className="text-xl flex flex-col items-center justify-center group"
      >
        <div className="relative w-screen md:w-[50vw] h-[50vh] md:h-screen overflow-hidden">
          <Image
            src="/menswear.jpg"
            alt="menswear"
            fill
            className="select-none object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <h1 className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold select-none transition-transform duration-500 group-hover:scale-95">
            menswear
          </h1>
        </div>
      </Link>
    </nav>
  );
}
