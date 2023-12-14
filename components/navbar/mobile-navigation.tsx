import Link from "next/link";
import { Suspense } from 'react';
import SearchIcon from "#/components/icons/search-icon";
import UserIcon from "#/components/icons/user-icon";
import HomeIcon from "#/components/icons/home-icon";
import Cart from '#/components/cart';
import CartIcon from '#/components/icons/cart';
import AuthMenu from "#/components/navbar/auth-menu";
// import { useRouter } from "next/router";
// import { useUI } from "#/contexts/ui.context";
// import { ROUTES } from "#/utils/routes";
// import dynamic from "next/dynamic";
import MobileMenu from "#/components/navbar/mobile-menu";

// const MobileMenu = dynamic(
// 	() => import("#/components/layout/header/mobile-menu")
// );

export default async function BottomNavigation({mainMenu, isLogedIn}:any) {
	let openSidebar;
	let openSearch;

	function handleLogin() {
		// setModalView("LOGIN_VIEW");
		// return openModal();
	}

	function handleMobileMenu() {
		// setDrawerView("MOBILE_MENU");
		// return openSidebar();
	}

	return (
		<>
			<div className="md:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4">
				<MobileMenu mainMenu={mainMenu} />
				<button
					className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
					// onClick={openSearch}
					aria-label="search-button"
				>
					<SearchIcon />
				</button>
				<Link href="/" className="flex-shrink-0">
					<HomeIcon />
				</Link>
				<Suspense fallback={<CartIcon />}>
					<Cart />
				</Suspense>
				<AuthMenu
					isAuthorized={isLogedIn ? true: false}
					className="flex-shrink-0"
					btnProps={{
						className: "flex-shrink-0 focus:outline-none",
						children: "Аккаунт"
					}}
				>
					<UserIcon />
				</AuthMenu>
			</div>
		</>
	)
}