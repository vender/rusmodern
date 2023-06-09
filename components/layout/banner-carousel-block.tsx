"use client"
import { useRef } from "react";
import BannerCard from "#/components/layout/banner-card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { siteSettings } from "#/lib/site-settings";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";

const breakpoints = {
	"1025": {
		slidesPerView: 3,
		spaceBetween: 28,
	},
	"480": {
		slidesPerView: 2,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 1,
		spaceBetween: 12,
	},
};

export default function BannerCarouselBlock({
	className = "mb-12 md:mb-12 lg:mb-14 pb-0.5 xl:pb-1.5",
}) {
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	return (
		<div className={className}>
			<div
				className={`carouselWrapper relative`}
			>
				<Swiper
					breakpoints={breakpoints}
					autoplay={{ delay: 5000 }}
					loop={true}
					modules={[Navigation]}
					navigation={{
						prevEl: prevRef.current ? prevRef.current : undefined,
						nextEl: nextRef.current ? nextRef.current : undefined,
					}}
					onBeforeInit={(swiper:any) => {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
				   }}
				>
					{siteSettings.promotionBannerTwo?.map((banner: any) => (
						<SwiperSlide key={`promotion-banner-key-${banner?.id}`}>
							<BannerCard
								banner={banner}
								href={`/${banner.slug}`}
								effectActive={true}
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