"use client"
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'
import { startTransition, useState } from "react";
import {
	IoHomeOutline,
	IoCartOutline,
	IoPersonOutline,
	IoSettingsOutline,
	IoLogOutOutline,
} from "react-icons/io5";

const accountMenu = [
	{
		slug: "/account/orders",
		name: "Заказы",
		icon: <IoCartOutline className="w-5 h-5" />,
	},
	{
		slug: "/account/details",
		name: "Информация",
		icon: <IoPersonOutline className="w-5 h-5" />,
	},
	{
		slug: "/account/change-password",
		name: "Изменить пароль",
		icon: <IoSettingsOutline className="w-5 h-5" />,
	},
];

export default function AccountNav() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const logout = async () => {
		setIsLoading(true);

		const response = await fetch(`/api/user`, {
			method: 'GET',
		});

		startTransition(() => {
			router.refresh();
			setIsLoading(false);
		});

	}

	const pathname = usePathname()
	const newPathname = pathname.split("/").slice(2, 3);
	const mainPath = `/${newPathname[0]}`;
	return (
		<nav className="flex flex-col md:w-2/6 2xl:w-4/12 md:pe-8 lg:pe-12 xl:pe-16 2xl:pe-20 pb-2 md:pb-0">
			{accountMenu.map((item) => {
				const menuPathname = item.slug.split("/").slice(2, 3);
				const menuPath = `/${menuPathname[0]}`;

				return (
					<Link 
						key={item.slug} 
						href={item.slug}
						aria-disabled={isLoading}
						className={
							mainPath === menuPath
								? "bg-gray-100 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2 "
								: "flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
						}
					>
							{item.icon}
							<span className="ps-2">{item.name}</span>
					</Link>
				);
			})}
			<button
				className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
				onClick={() => logout()}
			>
				<IoLogOutOutline className="w-5 h-5" />
				<span className="ps-2">Выход</span>
			</button>
		</nav>
	);
}
