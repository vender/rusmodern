"use client"
import { useWindowSize } from 'react-use';
import Carousel from "#/components/ui/carousel";
import { SwiperSlide } from "swiper/react";
import Image from 'next/image';

const productGalleryCarouselResponsive = {
    "768": {
        slidesPerView: 2,
    },
    "0": {
        slidesPerView: 1,
    },
};

export default function ProductGallery({ product }: any) {
    const { width } = useWindowSize();
    const { images, name, } = product;

    return (
        <>
            {width < 1025 ? (
                <Carousel
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={productGalleryCarouselResponsive}
                    className="product-gallery"
                    buttonClassName="hidden"
                >
                    {images?.map((item: any, index: number) => (
                        <SwiperSlide key={`product-gallery-key-${index}`}>
                            <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                                <Image
                                    src={
                                        item?.image ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${item?.image}` :
                                            "/assets/placeholder/products/product-gallery.svg"
                                    }
                                    width={400}
                                    height={400}
                                    alt={`${name}--${index}`}
                                    className="object-cover w-full"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Carousel>
            ) : (
                <div className="col-span-5 grid grid-cols-2 gap-2.5">
                    {images?.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="col-span-1 transition duration-150 ease-in hover:opacity-90"
                        >
                            <Image
                                src={
                                    item?.image ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${item?.image}` :
                                        "/assets/placeholder/products/product-gallery.svg"
                                }
                                width={400}
                                height={400}
                                alt={`${name}--${index}`}
                                className="object-cover w-full"
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
