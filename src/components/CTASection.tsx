import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { FooterType, Home } from "@/sanity/lib/type";

interface CTASectionProps {
  footer: FooterType;
  home: Home;
}

export default function CTASection({ footer, home }: CTASectionProps) {
  return (
    <section className="overflow-hidden relative py-[100px] bg-[#F6391A] mt-32 rounded-[40px] mx-3 lg:mx-[60px] text-center" aria-labelledby="cta-title">
      <Image
        src="/footer/top.png"
        alt="Élément décoratif supérieur - WePlanify"
        width={300}
        height={200}
        className="absolute -top-4 lg:top-0 -right-[70%] lg:right-0 rounded-tr-[40px]"
      />
      <Image
        src="/footer/left.png"
        alt="Élément décoratif gauche - WePlanify"
        width={250}
        height={150}
        className="absolute -left-[20%] -bottom-16 lg:left-0 lg:bottom-0 rounded-bl-[40px]"
      />
      <Image
        src="/footer/right.png"
        alt="Élément décoratif droit - WePlanify"
        width={250}
        height={150}
        className="absolute -bottom-16 -right-[20%] lg:-bottom-6 lg:right-0 rounded-b-[40px]"
      />
      <div id="cta-title" className="noBr px-4 lg:px-0 text-xl lg:text-[40px] font-unbounded [&_p]:text-white [&_strong]:text-white font-semibold leading-normal">
        <PortableText value={footer.title} />
      </div>
      <div className="px-4 lg:px-0 text-xl text-center [&_p]:text-white mt-3">
        <PortableText value={footer.subtitle} />
      </div>
      <p className="text-[#F6391A] bg-white w-fit mx-auto mt-[34px] rounded-[6px] px-6 py-2 font-semibold">
        {home.buttonDemo}
      </p>
    </section>
  );
}
