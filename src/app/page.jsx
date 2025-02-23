import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <nav className="grid grid-cols-2 h-screen w-screen">
      <Link
        href="/womenswear"
        className="text-xl flex flex-col items-center justify-center"
      >
        <div className="relative w-[50vw] h-screen">
          <Image
            src="/womenswear.jpg"
            alt="womenswear"
            fill
            className="object-cover object-top"
          />
          <h1 className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold">
            womenswear
          </h1>
        </div>
      </Link>
      <Link
        href="/menswear"
        className="text-xl flex flex-col items-center justify-center"
      >
        <div className="relative w-[50vw] h-screen">
          <Image
            src="/menswear.jpg"
            alt="menswear"
            fill
            className="object-cover object-center"
          />
          <h1 className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold">
            menswear
          </h1>
        </div>
      </Link>
    </nav>
  );
}
