"use client";

import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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
	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			align: 'start',
			slidesToScroll: 1,
			containScroll: 'trimSnaps',
			duration: 25000,
			dragFree: true,
		},
		[Autoplay({ delay: 0, stopOnInteraction: false, playOnInit: true, jump: false })]
	)

	return (
		<div className="w-full mt-16 lg:mt-24 relative">
			<Image
				src="/pass.svg"
				alt="Passeport décoratif - WePlanify"
				width={200}
				height={200}
				className="hidden lg:block -z-10 absolute bottom-[0] left-0 w-auto h-auto"
			/>

			<div className="overflow-hidden mx-auto relative">
				{/* Gradient fade effects */}
				<div className="pointer-events-none absolute inset-y-0 -left-4 md:-left-8 h-full w-[50px] md:w-[100px] bg-gradient-to-r from-white via-white/40 to-transparent z-10"></div>
				<div className="pointer-events-none absolute inset-y-0 -right-4 md:-right-8 h-full w-[50px] md:w-[100px] bg-gradient-to-l from-white via-white/40 to-transparent z-10"></div>

				<div className="cursor-grab embla pb-2 md:pb-4" ref={emblaRef}>
					<div className="embla__container flex px-4 md:px-5 lg:px-6">
						{blocks.map((block, index) => (
							<div
							key={index}
							 className="embla__slide mr-4 md:mr-5 lg:mr-6 flex-[0_0_264px] lg:flex-[0_0_420px]"
							>
						<div className="relative rounded-xl md:rounded-2xl w-[264px] h-[264px] lg:h-[420px] xl:h-[435px] lg:w-[420px]">
							<Image
								src={block.image}
								alt={block.tooltip}
								fill
								className="rounded-xl md:rounded-2xl object-cover"
							/>
									{/* Overlay content */}
									<div className="absolute top-3 md:top-6 lg:top-8 left-3 md:left-6 lg:left-8 bg-transparent">
										<div className="flex items-center gap-2 md:gap-3">
											<span className="bg-white w-2 h-2 md:w-3 md:h-3 rounded-full"></span>
											<p className="text-xs md:text-sm font-[600] text-white">
												{block.tooltip}
											</p>
										</div>

										<div className="font-unbounded mt-2 md:mt-3 lg:mt-4 text-base md:text-2xl lg:text-3xl font-[400] [&_p]:text-white [&_p]:leading-tight">
											<PortableText value={block.text} />
										</div>
									</div>

									{/* CTA Button */}
									<Link
										href={block.link}
										className="absolute bottom-3 md:bottom-6 lg:bottom-8 right-3 md:right-6 lg:right-8 px-3 md:px-4 lg:px-[21px] py-1.5 md:py-2 lg:py-[7px] rounded-full text-white border border-white bg-[#ffffff33] text-xs md:text-sm font-[600] hover:bg-[#ffffff55] transition-colors"
									>
										Voir plus
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}