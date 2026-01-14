import Image from "next/image";

interface TravelStepsProps {
  data: {
    title: string;
    description: string;
    badge: string;
    card1: {
      title: string;
      description: string;
      durationValue: string;
      durationLabel: string;
    };
    card2: {
      image: string;
    };
    card3: {
      title: string;
      description: string;
      statValue: string;
      statLabel: string;
    };
  };
}

export default function TravelSteps({ data }: TravelStepsProps) {
  if (!data) {
    return null;
  }

  return (
    <div className="px-4 lg:px-8 pb-8 lg:pb-12">
      <div className="max-w-[1536px] mx-auto">
        <div className="bg-[#001E13] rounded-[24px] lg:rounded-[40px] p-8 lg:p-12 xl:p-16">
          {/* Titre et Badge */}
          <div className="mb-8 lg:mb-12">
            {data.badge && (
              <h2 className="text-orange bg-[#FFFBF5] px-4 py-1 rounded-full text-sm lg:text-lg inline-block mb-4 lg:mb-6 font-nanum-pen">
                {data.badge}
              </h2>
            )}
            {data.title && (
              <h2 className="text-[#FFFBF5] text-2xl lg:text-4xl xl:text-[48px] font-londrina-solid leading-tight mb-4 lg:mb-6 whitespace-pre-line">
                {data.title}
              </h2>
            )}
            {data.description && (
              <p className="text-[#FFFBF5] text-base lg:text-lg font-karla leading-relaxed max-w-3xl">
                {data.description}
              </p>
            )}
          </div>

        {/* 3 Cartes */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr_1fr] gap-4 lg:gap-6">
          {/* Carte 1 - Gauche (Blanc avec durée) */}
          {data.card1 && (
            <div className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 flex flex-col justify-between min-h-[320px] lg:min-h-[380px]">
              <div>
                <h3 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid mb-3">
                  {data.card1.title}
                </h3>
                <p className="text-[#001E13] text-sm lg:text-base font-karla leading-relaxed">
                  {data.card1.description}
                </p>
              </div>
              <div className="mt-6">
                <p className="text-[#001E13] text-5xl lg:text-6xl font-londrina-solid">
                  {data.card1.durationValue}
                </p>
                <p className="text-[#001E13] text-xs lg:text-sm font-londrina-solid mt-1">
                  {data.card1.durationLabel}
                </p>
              </div>
            </div>
          )}

          {/* Carte 2 - Milieu (Image) - Légèrement plus large */}
          {data.card2?.image && (
            <div className="bg-white/20 rounded-[24px] lg:rounded-[32px] p-2 min-h-[320px] lg:min-h-[380px] flex items-center">
              <div className="relative w-full h-full rounded-[20px] lg:rounded-[28px] overflow-hidden">
                <Image
                  src={data.card2.image}
                  alt="Voyage"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Carte 3 - Droite (Jaune avec statistique) */}
          {data.card3 && (
            <div className="bg-[#EEF899] rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 flex flex-col justify-between min-h-[320px] lg:min-h-[380px]">
              <div>
                <h3 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid mb-3">
                  {data.card3.title}
                </h3>
                <p className="text-[#001E13] text-sm lg:text-base font-karla leading-relaxed">
                  {data.card3.description}
                </p>
              </div>
              <div className="mt-6">
                <p className="text-[#001E13] text-5xl lg:text-6xl font-londrina-solid">
                  {data.card3.statValue}
                </p>
                <p className="text-[#001E13] text-xs lg:text-sm font-londrina-solid mt-1">
                  {data.card3.statLabel}
                </p>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
