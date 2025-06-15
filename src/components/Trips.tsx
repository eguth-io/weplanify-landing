"use client";

import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface Block {
  image: string;
  tooltip: string;
  text: PortableTextBlock[];
  link: string;
}

interface CarouselProps {
  blocks: Block[];
}

export default function Trips({ blocks }: CarouselProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full mt-24 pl-6 relative">
      <img
        src="/pass.png"
        alt="pass"
        className="absolute bottom-[300px] left-0"
      />

      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {blocks.map((block: Block, index: number) => (
            <div
              key={index}
              className="relative rounded-2xl flex-shrink-0 snap-start"
              style={{ minWidth: "420px" }}
            >
              <Image
                src={block.image}
                alt={block.tooltip}
                width={420}
                height={435}
                className="rounded-2xl"
              />
              <div className="absolute top-8 left-8 bg-transparent">
                <div className="flex items-center gap-3">
                  <span className="bg-white w-3 h-3 rounded-full"></span>
                  <p className="text-sm font-[600] text-white">
                    {block.tooltip}
                  </p>
                </div>
                <div className="font-unbounded mt-4 text-3xl font-[400] [&_p]:text-white">
                  <PortableText value={block.text} />
                </div>
              </div>
              <Link
                href={block.link}
                className="absolute bottom-8 left-8 px-[21px] py-[7px] rounded-full text-white border border-white bg-[#ffffff33] text-sm font-[600] hover:bg-[#ffffff55] transition-colors pointer-events-auto"
                onMouseDown={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  e.stopPropagation()
                }
              >
                Voir plus
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
