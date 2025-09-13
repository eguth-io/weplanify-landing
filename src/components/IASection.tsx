import Image from "next/image";
import { IA } from "@/sanity/lib/type";

interface IASectionProps {
  ia: IA;
}

export default function IASection({ ia }: IASectionProps) {
  return (
    <section className="relative px-3 lg:px-16 py-20 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-48 border-b border-gray-200" aria-labelledby="ia-title">
      <div className="flex flex-col">
        <p id="ia-title" className="leading-normal text-center lg:text-start font-unbounded text-xl lg:text-[40px] text-black lg:font-medium">
          {ia.title}
        </p>
        <p className="text-gray-600 text-sm lg:text-base text-center lg:text-start mt-4 mb-6">
          Notre assistant IA révolutionnaire génère votre itinéraire de voyage personnalisé en quelques secondes. Posez-lui toutes vos questions pour obtenir des recommandations expertes.
        </p>
        <div className="mb-6 lg:mb-24 mt-6 relative flex items-center bg-[#F8F7F8] rounded-full shadow-md border border-gray-200 overflow-hidden max-w-2xl pr-4">
          <input
            type="text"
            placeholder={ia.placeholder}
            className="flex-1 px-6 py-4 text-[#4C3F4A] h-[35px] lg:h-auto text-xs lg:text-lg bg-[#F8F7F8] outline-none placeholder-[#4C3F4A]"
            style={{ fontSize: '16px' }}
          />

          {/* Submit Button */}
          <button type="submit" aria-label="Soumettre la recherche">
            <Image
              src="/input.svg"
              alt="Bouton de soumission - WePlanify"
              width={32}
              height={32}
              className="w-[23px] h-[23px] lg:w-[33px] lg:h-[33px]"
            />
          </button>
        </div>
      </div>
      <Image
        src={ia.image}
        alt="ia"
        width={540}
        height={640}
        className="object-cover hidden lg:block"
      />
    </section>
  );
}
