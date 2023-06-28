export const siteSettings = {
	name: "ilMonte",
	description:
		"Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.",
	author: {
		name: "vender",
		websiteUrl: "/#",
		address: "",
	},
	logo: {
		alt: "ilMonte",
		href: "/",
		width: 95,
		height: 30,
	},
	defaultLanguage: "ru",
	currencyCode: "RUB",
	site_header: {
		mobileMenu: [
			{
				id: 1,
				path: "/",
				label: "menu-demos",
				subMenu: [
					{
						id: 1,
						path: "/",
						label: "menu-modern",
					},
					{
						id: 2,
						path: "/standard",
						label: "menu-standard",
					},
					{
						id: 3,
						path: "/minimal",
						label: "menu-minimal",
					},
					{
						id: 4,
						path: "/vintage",
						label: "menu-vintage",
					},
					{
						id: 5,
						path: "/classic",
						label: "menu-classic",
					},
				],
			},
			{
				id: 3,
				path: "/search?q=women-wear",
				label: "menu-women-wear",
			},
			{
				id: 5,
				path: "/search",
				label: "menu-search",
			},
			{
				id: 6,
				path: "/",
				label: "menu-pages",
				subMenu: [
					{
						id: 1,
						path: "/",
						label: "menu-users",
						subMenu: [
							{
								id: 1,
								path: "/my-account",
								label: "menu-my-account",
							},
							{
								id: 2,
								path: "/signin",
								label: "menu-sign-in",
							},
							{
								id: 3,
								path: "/signup",
								label: "menu-sign-up",
							},
							{
								id: 4,
								path: "/forget-password",
								label: "menu-forget-password",
							},
						],
					},
					{
						id: 2,
						path: "/faq",
						label: "menu-faq",
					},
					{
						id: 3,
						path: "/privacy",
						label: "menu-privacy-policy",
					},
					{
						id: 4,
						path: "/terms",
						label: "menu-terms-condition",
					},
					{
						id: 5,
						path: "/contact-us",
						label: "menu-contact-us",
					},
					{
						id: 6,
						path: "/checkout",
						label: "menu-checkout",
					},
					{
						id: 7,
						path: "/collections/mens-collection",
						label: "menu-collection",
					},
					{
						id: 8,
						path: "/category/man",
						label: "menu-category",
					},
					{
						id: 9,
						path: "/order",
						label: "menu-order",
					},
					{
						id: 10,
						path: "/404",
						label: "menu-404",
					},
				],
			},
		],
	},
	promotionBannerTwo: [
		{
			id: 1,
			title: "Men's Collection",
			slug: "men's-collection",
			image: {
				mobile: {
					url: "/assets/images/banner/small/banner-mobile-1.jpg",
					width: 450,
					height: 150,
				},
				desktop: {
					url: "/assets/images/banner/small/banner-1.jpg",
					width: 580,
					height: 360,
				},
			},
		},
		{
			id: 2,
			title: "Women's Collection",
			slug: "women's-collection",
			image: {
				mobile: {
					url: "/assets/images/banner/small/banner-mobile.jpg",
					width: 450,
					height: 150,
				},
				desktop: {
					url: "/assets/images/banner/small/banner.jpg",
					width: 580,
					height: 360,
				},
			},
		},
		{
			id: 3,
			title: "Kid's Collection",
			slug: "kid's-collection",
			image: {
				mobile: {
					url: "/assets/images/banner/small/banner-mobile-3.jpg",
					width: 450,
					height: 150,
				},
				desktop: {
					url: "/assets/images/banner/small/banner-3.jpg",
					width: 580,
					height: 360,
				},
			},
		},
		{
			id: 4,
			title: "Men's Collection",
			slug: "men's-collection",
			image: {
				mobile: {
					url: "/assets/images/banner/small/banner-mobile-1.jpg",
					width: 450,
					height: 150,
				},
				desktop: {
					url: "/assets/images/banner/small/banner-1.jpg",
					width: 580,
					height: 360,
				},
			},
		}
	]
};
