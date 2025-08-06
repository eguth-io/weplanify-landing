import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery } from "@/sanity/lib/query";
import { NavType } from "@/sanity/lib/type";
import Image from "next/image";
import Link from "next/link";
import { PulsatingButton } from "./magicui/pulsating-button";

export default async function Nav() {
  const navData: NavType = await sanityFetch({
    query: navQuery,
    tags: ["nav"],
  });

  return (
    <nav className="bg-[#FFFCFB] flex justify-between items-center px-[30px] lg:px-[70px] py-[30px] fixed w-full z-50">
      <Image
        src={navData.logo}
        alt="logo"
        width={155}
        height={66}
        className="block w-[66px] h-[30px] lg:w-[155px] lg:h-[66px]"
      />

      <Image
        src={"/burgerMenu.svg"}
        alt="burger menu"
        width={18}
        height={12}
        className="lg:hidden"
      />

      <div className="lg:flex items-center gap-6 hidden">
        <Link href={navData.ctaLink} className="text-sm font-[500]">
          Connexion
        </Link>
        <Link href={navData.ctaLink}>
          <PulsatingButton>{navData.ctaButton}</PulsatingButton>
        </Link>
      </div>
    </nav>
  );
}
