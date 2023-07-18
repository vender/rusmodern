import { Suspense } from 'react';
import { siteSettings } from "#/lib/site-settings";
import Cart from '#/components/cart';
import CartIcon from '#/components/icons/cart';
import SearchIcon from "#/components/icons/search-icon";
import { loggedIn } from '#/lib';
// import MobileMenu from './mobile';
import Logo from "#/components/ui/logo";
import HeaderMenu from "#/components/navbar/header-menu";
import AuthMenu from './auth-menu';

async function getCategoryPages(categories:any){
  return categories.map((cat:any) => {
    const subCat = cat.categories ? cat.categories : false;
    return cat.top ? {
      id: cat.category_id,
      path: cat.category_id,
      label: cat.name,
      subMenu: subCat.length ? subCat.map((subCat:any) =>{
        return {
          id: subCat.category_id,
          path: subCat.category_id,
          label: subCat.name,
        }
      }).filter((item:any) => item) : false
    } : null
  }).filter((item:any) => item)
}

export default async function Navbar({categories, infoPages}:any) {
  infoPages = infoPages.map((infoPage:any) =>{
    return infoPage.bottom && {
      id: infoPage.information_id,
      path: `/info/${infoPage.information_id}`,
      label: infoPage.title,
    }
  }).filter((item:any) => item);
  
  const isLogedIn = await loggedIn();

  const mainMenu = {
    menu: [
      {
        id: 0,
        path: "/",
        label: "Категории",
        subMenu: await getCategoryPages(categories)
      },
      ...infoPages
    ]
  }
  
  return (
    <header
      id="siteHeader"
      // ref={siteHeaderRef}
      className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
    >
      <div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out">
        <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">

          <Logo className='inline-flex focus:outline-none' href={siteSettings.logo.href} width={siteSettings.logo.width} height={siteSettings.logo.height} />

          <HeaderMenu
            data={mainMenu.menu}
            className="hidden lg:flex md:ms-6 xl:ms-10"
          />

          <div className="items-center justify-end flex-shrink-0 hidden lg:flex gap-x-6 lg:gap-x-5 xl:gap-x-8 2xl:gap-x-10 ltr:ml-auto rtl:mr-auto">
            <button
              className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
              // onClick={openSearch}
              aria-label="search-button"
            >
              <SearchIcon />
            </button>
            <div className="-mt-0.5 flex-shrink-0">
              <AuthMenu
                isAuthorized={isLogedIn ? true: false}
                className="text-sm xl:text-base text-heading font-semibold"
                btnProps={{
                  className:
                    "text-sm xl:text-base text-heading font-semibold focus:outline-none",
                  children: "Аккаунт",
                }}
              >
                Войти
              </AuthMenu>
            </div>
            <Suspense fallback={<CartIcon />}>
              <Cart />
            </Suspense>
          </div>

        </div>

      </div>

    </header>
  );
}