"use client"
import BannerCard from "#/components/layout/banner-card";
import { SwiperSlide } from 'swiper/react';
import Carousel from "#/components/ui/carousel";
import { siteSettings } from "#/lib/site-settings";

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
	return (
		<div className={className}>
			<div
				className={`carouselWrapper relative`}
			>
					<Carousel
						breakpoints={breakpoints}
						autoplay={{ delay: 5000 }}
						className="mx-0"
						pagination={false}
						navigation={true}
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
					</Carousel>
			</div>
		</div>
	)
}