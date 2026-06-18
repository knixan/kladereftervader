import Image from "next/image";
import {
  GiMonclerJacket,
  GiArmoredPants,
  GiSkirt,
  GiShorts,
  GiLargeDress,
  GiGloves,
  GiWinterGloves,
  GiHoodie,
} from "react-icons/gi";
import { FaSocks, FaUmbrella, FaTshirt } from "react-icons/fa";
import { FaBottleWater, FaRedhat } from "react-icons/fa6";
import { PiPants, PiPantsFill, PiBaseballCap } from "react-icons/pi";
import { CgCap } from "react-icons/cg";
import { CiShirt } from "react-icons/ci";

interface ClothIconProps {
  clothKey: string;
  size?: number;
}

export default function ClothIcon({ clothKey, size = 44 }: ClothIconProps) {
  switch (clothKey) {
    case "jacka":
      return <GiMonclerJacket size={size} title="Jacka" />;
    case "hoodie":
      return <GiHoodie size={size} title="Hoodie" />;
    case "strumpor":
      return <FaSocks size={size} title="Strumpor" />;
    case "tshirt":
      return <FaTshirt size={size} title="T-shirt" />;
    case "byxor":
      return <PiPants size={size} title="Byxor" />;
    case "langkalsonger":
      return <GiArmoredPants size={size} title="Långkalsonger" />;
    case "termobyxor":
      return <PiPantsFill size={size} title="Tjocka byxor" />;
    case "kjol":
      return <GiSkirt size={size} title="Kjol" />;
    case "linne":
      return <CiShirt size={size} title="Linne" />;
    case "shorts":
      return <GiShorts size={size} title="Shorts" />;
    case "klanning":
      return <GiLargeDress size={size} title="Klänning" />;
    case "tunnavantar":
      return <GiGloves size={size} title="Tunna vantar" />;
    case "vantar":
      return <GiWinterGloves size={size} title="Varma vantar" />;
    case "mossa":
      return <CgCap size={size} title="Mössa" />;
    case "keps":
      return <PiBaseballCap size={size} title="Keps" />;
    case "hatt":
      return <FaRedhat size={size} title="Hatt" />;
    case "vatten":
      return <FaBottleWater size={size} title="Vattenflaska" />;
    case "paraply":
      return <FaUmbrella size={size} title="Paraply" />;
    case "halsduk":
      return (
        <Image
          src="/icons/halsduk.png"
          alt="Halsduk"
          width={size}
          height={size}
          className="object-contain"
        />
      );
    case "regnklader":
      return (
        <Image
          src="/icons/regnklader.png"
          alt="Regnkläder"
          width={size}
          height={size}
          className="object-contain"
        />
      );
    case "vinterskor":
      return (
        <Image
          src="/icons/winterboot.png"
          alt="Vinterskor"
          width={size}
          height={size}
          className="object-contain"
        />
      );
    case "gummistovlar":
      return (
        <Image
          src="/icons/gummistovlar.png"
          alt="Gummistövlar"
          width={size}
          height={size}
          className="object-contain"
        />
      );
    case "skor":
      return (
        <Image
          src="/icons/sneakers.png"
          alt="Skor"
          width={size}
          height={size}
          className="object-contain"
        />
      );
    case "tofflor":
      return (
        <Image
          src="/icons/slippers.png"
          alt="Tofflor"
          width={size}
          height={size}
          className="object-contain"
        />
      );
    case "solkram":
      return (
        <Image
          src="/icons/sunlotion.png"
          alt="Solkräm"
          width={size}
          height={size}
          className="object-contain"
        />
      );
    default:
      return null;
  }
}
