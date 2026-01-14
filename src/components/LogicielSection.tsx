import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Features, Logiciel } from "@/sanity/lib/type";
import { Safari } from "@/components/magicui/safari";

interface LogicielSectionProps {
  logiciel: Logiciel;
  features: Features
}

export default function LogicielSection({ logiciel }: LogicielSectionProps) {
  return (
    <section className="relative border-t border-gray-200 py-16 lg:py-32 border-t border-gray-200 flex flex-col items-center justify-center" aria-labelledby="logiciel-title">
      <Image
        src="/linesRight.svg"
        alt="Lignes décoratives droites - WePlanify"
        width={100}
        height={400}
        className="hidden lg:block absolute top-1/2 right-0 z-0 transform -translate-y-1/2"
      />
      <Image
        src="/linesLeft.svg"
        alt="Lignes décoratives gauches - WePlanify"
        width={100}
        height={400}
        className="hidden lg:block absolute top-1/2 left-0 z-0 transform -translate-y-1/2"
      />
      <div id="logiciel-title" className="text-[20px] lg:text-[40px] font-unbounded [&_p]:text-black [&_strong]:text-[#F6391A] font-semibold text-center">
        <PortableText value={logiciel.title} />
      </div>
      <Safari
        className="z-10 mt-8 lg:mt-12 object-cover w-[375px] h-[250px] lg:max-w-[900px] xl:w-[880px] lg:h-[550px] shadow-lg"
        imageSrc={logiciel.image}
      />
    </section>
  );
}
