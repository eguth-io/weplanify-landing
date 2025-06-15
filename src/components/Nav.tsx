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
    <nav className="flex justify-between items-center px-[70px] py-[30px] fixed w-full z-50">
      <Image src={navData.logo} alt="logo" width={154} height={66} />
      <div className="flex items-center gap-6">
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
