"use client";

import dynamic from "next/dynamic";

const WorldCupHostCitiesMap = dynamic(() => import("./WorldCupHostCitiesMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] lg:h-[520px] rounded-[24px] bg-[#001E13]/5 border border-[#001E13]/10" />
  ),
});

export default function WorldCupHostCitiesMapLazy({ locale }: { locale: string }) {
  return <WorldCupHostCitiesMap locale={locale} />;
}
