import { IoLocationSharp, IoMail, IoCallSharp } from "react-icons/io5";
import Link from "next/link";

const mapImage = "/assets/images/map.png";
const data = [
	{
		id: 1,
		slug: "https://yandex.ru/maps/-/CDRt56kp",
		icon: <IoLocationSharp />,
		name: "Адрес",
		description: "Краснодарский край, ст.Динская, ул.70 лет Октября 25",
	},
	{
		id: 2,
		slug: "mailto:info.rusmodern@mail.ru",
		icon: <IoMail />,
		name: "Email",
		description: "info.rusmodern@mail.ru",
	},
	{
		id: 3,
		slug: "tel:89183330100",
		icon: <IoCallSharp />,
		name: "Телефон",
		description: "8 (918) 333-01-00 - Николай",
	},
];

import React from 'react'

export default function ContactInfoBlock() {
  return (
		<div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
			<h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
				Как нас найти
			</h4>
			{data?.map((item: any) => (
				<div key={`contact--key${item.id}`} className="flex pb-7">
					<div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
						{item.icon}
					</div>
					<div className="flex flex-col ps-3 2xl:ps-4">
						<h5 className="text-sm font-bold text-heading">
							{item.name}
						</h5>
						<Link href={item.slug} className="text-sm mt-0">
							{item.description}
						</Link>
					</div>
				</div>
			))}
			<Link href="https://yandex.ru/maps/-/CDRt56kp" target="_blank"><img src={mapImage} alt="text-map" className="rounded-md" /></Link>
		</div>
  )
}