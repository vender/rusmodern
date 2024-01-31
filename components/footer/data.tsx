import { IoLogoVk } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";

export const footer = {
	widgets: [
		{
			id: 1,
			widgetTitle: "Соцсети",
			lists: [
				{
					id: 1,
					title: "Телеграм",
					path: "https://t.me/ilmonteshop",
					icon: <FaTelegramPlane />,
				},
				{
					id: 2,
					title: "Вконтакте",
					path: "https://vk.com/ilmonteshop",
					icon: <IoLogoVk />,
				}
			],
		},
		// {
		// 	id: 2,
		// 	widgetTitle: "Контакты",
		// 	lists: [
		// 		{
		// 			id: 1,
		// 			title: "link-contact-us",
		// 			path: "/contact-us",
		// 		},
		// 		{
		// 			id: 2,
		// 			title: "link-email",
		// 			path: "/",
		// 		},
		// 		{
		// 			id: 3,
		// 			title: "link-email-two",
		// 			path: "/",
		// 		},
		// 		{
		// 			id: 4,
		// 			title: "link-phone",
		// 			path: "/",
		// 		},
		// 	],
		// },
		{
			id: 3,
			widgetTitle: "О нас",
			lists: [
				{
					id: 3,
					title: "Связаться с нами",
					path: "/contact-us",
				},
				{
					id: 4,
					title: "Лицензии",
					path: "/",
				},
			],
		},
		{
			id: 4,
			widgetTitle: "Для клиентов",
			lists: [
				{
					id: 1,
					title: "Частые вопросы",
					path: "/faq",
				},
				{
					id: 2,
					title: "Сервисные центры",
					path: "/servises",
				}
			],
		},
		{
			id: 6,
			widgetTitle: "Магазины",
			lists: [
				{
					id: 1,
					title: "Ozon",
					path: "https://www.ozon.ru/brand/il-monte-85285187",
				},
				{
					id: 2,
					title: "Wildberries",
					path: "https://www.wildberries.ru/brands/il-monte",
				},
				{
					id: 3,
					title: "DNS",
					path: "https://www.dns-shop.ru/product/87dc97309aef1804/elektriceskij-duhovoj-skaf-il-monte-bo-70-an-rustico-belyj",
				},
				{
					id: 4,
					title: "Мвидео",
					path: "https://www.mvideo.ru/vstraivaemaya-tehnika-4/vstraivaemye-paneli-4108/f/category=vstraivaemye-gazovye-paneli-679/brand=il-monte",
				},
			],
		},
	],
	payment: [
		{
			id: 1,
			path: "/",
			image: "/assets/images/payment/mastercard.svg",
			name: "payment-master-card",
			width: 34,
			height: 20,
		},
		{
			id: 2,
			path: "/",
			image: "/assets/images/payment/visa.svg",
			name: "payment-visa",
			width: 50,
			height: 20,
		},
		{
			id: 3,
			path: "/",
			image: "/assets/images/payment/mir-logo.svg",
			name: "payment-paypal",
			width: 76,
			height: 20,
		}
	],
};
