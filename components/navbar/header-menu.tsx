import clsx from 'clsx';
import Link from 'next/link';
import { FaChevronDown } from "react-icons/fa";
import ListMenu from "#/components/navbar/list-menu";

export default function HeaderMenu({ data, className }: { data: any; className?: string }) {
	return (
		<nav className={clsx(`headerMenu flex w-full relative`, className)}>

			{/* <nav className="fixed w-full z-10 flex items-center justify-between bg-white p-4 dark:bg-black lg:px-6">
				<div className="block w-1/3 md:hidden">
					<MobileMenu menu={menu} />
				</div>
				<div className="flex justify-self-center md:justify-self-start">
					<div className="md:mr-4">

					</div>
					{menu.length ? (
						<ul className="hidden md:flex">
							{menu.map((item: Menu) => (
								item.bottom ? <li key={item.title}>
									<Link
										href={`/informations/${item.information_id}`}
										className="px-2 py-1 text-gray-800 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 inline-block shrink"
									>
										{item.title}
									</Link>
								</li>
									: null
							))}
						</ul>
					) : null}
				</div>

			</nav> */}


			{data?.map((item: any) => (
				<div
					className={`menuItem group cursor-pointer py-7 ${item.subMenu ? "relative" : ""
						}`}
					key={item.id}
				>
					<Link
						href={item.path}
						className="inline-flex items-center text-sm xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
					>
						{item.label}
						{(item?.columns || item.subMenu) && (
							<span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
								<FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
							</span>
						)}
					</Link>

					{item?.subMenu && Array.isArray(item.subMenu) && (
						<div className="subMenu shadow-header bg-gray-200 absolute start-0 opacity-0 group-hover:opacity-100">
							<ul className="text-body text-sm py-5">
								{item.subMenu.map((menu: any, index: number) => {
									const dept: number = 1;
									const menuName: string = `sidebar-menu-${dept}-${index}`;

									return (
										<ListMenu
											dept={dept}
											data={menu}
											hasSubMenu={menu.subMenu}
											menuName={menuName}
											key={menuName}
											menuIndex={index}
										/>
									);
								})}
							</ul>
						</div>
					)}
				</div>
			))}
		</nav>
	)
}
