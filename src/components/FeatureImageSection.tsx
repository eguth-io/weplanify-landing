import Image from "next/image";

interface FeatureImageSectionProps {
  data: {
    title: string;
    image: string;
  };
}

export default function FeatureImageSection({ data }: FeatureImageSectionProps) {
  if (!data || !data.title || !data.image) {
    return null;
  }

  return (
    <div className="px-4 lg:px-8 pt-8 lg:pt-12">
      <div className="max-w-[1536px] mx-auto">
        {data.title && (
          <h2 className="text-[#001E13] text-3xl lg:text-5xl xl:text-6xl font-londrina-solid leading-tight mb-8 lg:mb-12 text-center max-w-[800px] mx-auto whitespace-pre-line">
            {data.title}
          </h2>
        )}
        <div className="relative w-full max-w-[864px] mx-auto">
          <Image
            src={data.image}
            alt={data.title || "Feature"}
            width={864}
            height={450}
            className="w-full h-auto rounded-[24px] lg:rounded-[32px]"
          />
        </div>
      </div>
    </div>
  );
}
