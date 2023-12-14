"use client"
import Card from "#/components/layout/card";
import Carousel from "#/components/ui/carousel";
import SectionHeader from "#/components/layout/section-header";
import { SwiperSlide } from 'swiper/react';

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
		slidesPerView: 2,
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

	return (
		<div className={className}>
			<SectionHeader sectionHeading={sectionHeading} />
			<div className="carouselWrapper relative">
					<Carousel
						breakpoints={breakpointsCircle}
						autoplay={{ delay: 5000 }}
						className="mx-0"
						pagination={false}
						arrows={true}
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
									href={`/category/${category.category_id}`}
									variant={type}
									effectActive={true}
									size={type === "rounded" ? "medium" : "small"}
								/>
							</SwiperSlide>
						))}
					</Carousel>
			</div>
		</div>
	)
}