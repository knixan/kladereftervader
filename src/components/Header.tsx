// import Image from "next/image";
export default function Header() {
  return (
    <header className="text-center w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4279b8] mb-3 sm:mb-4 tracking-tight">
        🌤 Kläder efter Väder
      </h1>
      {/* <Image
        src="/kladereftervader.png"
        alt="Väder ikonen"
        width={300}
        height={300}
        className="mx-auto mb-4"
      /> */}
    

      <p className="text-base sm:text-lg md:text-xl font-bold bg-[#51b1e8] text-[#ffffff] py-3 sm:py-4 px-5 sm:px-6 rounded-3xl leading-snug shadow-sm">
        Tips på hur du ska klä dig efter vädret idag 💛
      </p>
    </header>
  );
}
