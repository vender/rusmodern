import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '#/components/navbar';
import Footer from '#/components/footer/footer';
import MobileNavigation from "#/components/navbar/mobile-navigation";
import { Toaster } from 'react-hot-toast';
import { getCategories, getInformations, loggedIn } from '#/lib'

const inter = Inter({
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export const revalidate = 60;

export const metadata = {
  title: "ilMonte Shop",
};

async function getCategoryPages(categories:any){
  return categories.map((cat:any) => {
    const subCat = cat.categories ? cat.categories : false;
    return cat.top ? {
      id: cat.category_id,
      path: `/category/${cat.category_id}`,
      label: cat.name,
      subMenu: subCat.length ? subCat.map((subCat:any) =>{
        return {
          id: subCat.category_id,
          path: `/category/${subCat.category_id}`,
          label: subCat.name,
        }
      }).filter((item:any) => item) : false
    } : null
  }).filter((item:any) => item)
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories(0);
  let infoPages = await getInformations();
  const subMenu = await getCategoryPages(categories);
  const isLogedIn = await loggedIn();

  infoPages = infoPages.map((infoPage:any) =>{
    return infoPage.bottom && {
      id: infoPage.information_id,
      path: `/info/${infoPage.information_id}`,
      label: infoPage.title,
    }
  }).filter((item:any) => item);

  const mainMenu = {
    menu: [
      {
        id: 0,
        path: "/",
        label: "Категории",
        subMenu: subMenu
      },
      ...infoPages
    ]
  }

  return (
    <html lang="ru" className={`${inter.variable}`}>
      <head />
      <body>
        <div className='flex flex-col min-h-screen'>
          <Navbar mainMenu={mainMenu} infoPages={infoPages} isLogedIn={isLogedIn} />
          <main className='relative flex-grow'>{children}</main>
          <Footer />
          <MobileNavigation mainMenu={mainMenu} infoPages={infoPages} isLogedIn={isLogedIn} />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
