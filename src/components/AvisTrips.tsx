"use client";

import { Trip, TripsType } from "@/sanity/lib/type";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useState } from "react";

export default function AvisTrips({ trips }: { trips: TripsType }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getVisibleItems = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg: 3 éléments
      if (window.innerWidth >= 768) return 2; // md: 2 éléments
      return 1; // sm: 1 élément
    }
    return 3; // valeur par défaut
  };

  const visibleItems = getVisibleItems();
  const maxIndex = Math.max(0, trips.tripsList.length - visibleItems);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1,
    );
  };

  const itemWidth = 340 + 16; // 340px width + 16px gap (gap-4)

  return (
    <div className="relative mt-40 flex flex-col items-center justify-center">
      <div className="text-xl lg:text-[40px] font-unbounded [&_p]:text-black lg:[&_strong]:text-[#F6391A]">
        <PortableText value={trips.title} />
      </div>
      <img
        src="/line1.png"
        alt="pass"
        className="hidden lg:block -z-10 absolute top-0 left-0"
      />
      <img
        src="/line2.png"
        alt="pass"
        className="hidden lg:block -z-10 absolute -right-0 top-28"
      />
      <img
        src="/line1Mobile.png"
        alt="pass"
        className="lg:hidden -z-10 absolute top-0 left-0"
      />
      <img
        src="/line2Mobile.png"
        alt="pass"
        className="lg:hidden absolute -right-0 bottom-24"
      />
      <div className="relative w-4/5 mt-16">
        <div className="relative overflow-hidden rounded-lg">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
              width: `${trips.tripsList.length * itemWidth}px`,
            }}
          >
            {trips.tripsList.map((trip: Trip, index: number) => (
              <div
                key={index}
                className="w-[340px] flex-shrink-0 flex flex-col"
              >
                <div className="relative rounded-lg">
                  <Image
                    src={trip.tripImage}
                    alt={`Trip ${trip.firstName}`}
                    width={338}
                    height={340}
                    style={{ borderRadius: "8px" }}
                    className="w-[300px] h-[300px] lg:w-full lg:h-[400px] object-cover"
                  />

                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <Image
                      src={trip.profileImage}
                      alt="profile"
                      width={48}
                      height={48}
                    />
                    <div className="text-white font-semibold text-[13px] drop-shadow-lg">
                      {trip.firstName}
                    </div>
                  </div>
                </div>

                <div className="text-sm mt-6 [&_p]:text-black">
                  <PortableText value={trip.description} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="hidden lg:block absolute left-[-64px] top-1/2 transform -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200"
          disabled={trips.tripsList.length <= visibleItems}
        >
          <Image src="/arrow.svg" alt="Previous" width={47} height={47} />
        </button>

        <button
          onClick={nextSlide}
          className="hidden lg:block absolute right-[-64px] top-1/2 transform -translate-y-1/2 z-10 rotate-180 hover:scale-110 transition-transform duration-200"
          disabled={trips.tripsList.length <= visibleItems}
        >
          <Image src="/arrow.svg" alt="Next" width={47} height={47} />
        </button>

        {/* Indicateurs de progression */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-[#F6391A] w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
