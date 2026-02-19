import Image from "next/image";
export default function Header() {
  return (
    <header className="text-center w-full">
      <Image
        src="/kladereftervader.png"
        alt="Väder ikonen"
        width={300}
        height={300}
        className="mx-auto mb-4"
      />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-purple-800 mb-3 sm:mb-4 tracking-tight">
        🌤 Kläder efter Väder
      </h1>

      <p className="text-base sm:text-lg md:text-xl font-bold bg-sky-500 text-white py-3 sm:py-4 px-5 sm:px-6 rounded-3xl leading-snug shadow-sm">
        Tips på hur du ska klä dig efter vädret idag 💛
      </p>
    </header>
  );
}
