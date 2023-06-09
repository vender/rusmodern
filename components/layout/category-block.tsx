"use client"
import { useRef } from "react";
import Card from "#/components/layout/card";
import SectionHeader from "#/components/layout/section-header";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";

interface CategoriesProps {
	categories?: any;
	sectionHeading: string;
	className?: string;
	type?: "rounded" | "circle";
}

const breakpointsCircle = {
	"1720": {
		slidesPerView: 8,
		spaceBetween: 48,
	},
	"1400": {
		slidesPerView: 7,
		spaceBetween: 32,
	},
	"1025": {
		slidesPerView: 6,
		spaceBetween: 28,
	},
	"768": {
		slidesPerView: 5,
		spaceBetween: 20,
	},
	"500 ": {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
};


export default function CategoryBlock({
	categories,
	className = "mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0",
	sectionHeading,
	type = "circle",
}: CategoriesProps) {
	const isLoading = false;
	// console.log(categories);

	const prevRef = useRef(null);
	const nextRef = useRef(null);

	return (
		<div className={className}>
			<SectionHeader sectionHeading={sectionHeading} />
			<div className="carouselWrapper relative">
				<Swiper
					breakpoints={breakpointsCircle}
					modules={[Navigation]}
					loop={true}
					navigation={{
						prevEl: prevRef.current ? prevRef.current : undefined,
						nextEl: nextRef.current ? nextRef.current : undefined,
					}}
					onBeforeInit={(swiper: any) => {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
					}}
				// buttonClassName="-mt-8 md:-mt-10"
				>
					{isLoading && !categories
						? Array.from({ length: 10 }).map((_, idx) => {
							if (type === "rounded") {
								return (
									<SwiperSlide key={`card-rounded-${idx}`}>
										<>CardRoundedLoader</>
									</SwiperSlide>
								);
							}
							return (
								<SwiperSlide key={`card-circle-${idx}`}>
									<>CardRounded</>
								</SwiperSlide>
							);
						})
						: categories?.map((category: any) => (
							<SwiperSlide key={`category--key-${category.category_id}`}>
								<Card
									item={category}
									href={`/${category.category_id}`}
									variant={type}
									effectActive={true}
									size={type === "rounded" ? "medium" : "small"}
								/>
							</SwiperSlide>
						))}
				</Swiper>
				<div className="flex items-center w-full absolute top-2/4 z-10">
					<button
						ref={prevRef}
						aria-label="prev-button"
						className="w-7 h-7 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl text-black flex items-center justify-center rounded-full text-gray-0 bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none start-0 transform shadow-navigation -translate-x-1/2"
					>
						<IoIosArrowBack />
					</button>
					<button
						ref={nextRef}
						aria-label="next-button"
						className="w-7 h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl text-black flex items-center justify-center rounded-full bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none end-0 transform shadow-navigation translate-x-1/2"
					>
						<IoIosArrowForward />
					</button>
				</div>
			</div>
		</div>
	)
}