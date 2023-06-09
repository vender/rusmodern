"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// import required modules
import { Autoplay } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import Link from 'next/link';

export default function Banners({ banners }: { banners: any }) {
    
    return (
        <div className='carouselWrapper relative max-w-[1920px] mb-5 md:mb-12 lg:mb-14 2xl:mb-16 mx-auto overflow-hidden px-4 md:px-8 2xl:px-0'>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                modules={[Autoplay, Pagination]}
                pagination={{
                    clickable: true
                }}
                className="mx-0"
            >
                {banners.map((banner: any) => (

                    <SwiperSlide className="carouselItem px-0 2xl:px-3.5" key={banner.banner_image_id}>
                        <Link
                            href={banner.link}
                            className={"h-full group flex justify-center relative overflow-hidden"}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${banner.image}`}
                                className="bg-gray-300 object-cover w-full rounded"
                                width={1800}
                                height={800}
                                alt=''
                            />
                        </Link>
                    </SwiperSlide>
                ))
                }
            </Swiper>
        </div>
    )
}
