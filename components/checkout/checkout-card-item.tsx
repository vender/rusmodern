import Image from "next/image";

export default function CheckoutItem({item}:any) {
	
  	return (
		<div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
			<div className="flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
				<Image
					src={
						item.image
						? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${item.image}`
						: "/assets/placeholder/products/product-gallery.svg"
					}
					width={100}
					height={100}
					loading="eager"
					alt={item.name || "Фото товара"}
					className="object-cover"
				/>
			</div>
			<h6 className="text-sm ps-3 font-regular text-heading">
				{item.name}
			</h6>
			<div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
				{item.total} ₽
			</div>
		</div>
  	)
}