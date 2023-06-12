import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '#/components/navbar';
import Footer from '#/components/footer/footer';
import { getCategories, getInformations } from '#/lib'

const inter = Inter({
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: "Open React",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories(0);
  const infoPages = await getInformations();

  return (
    <html lang="ru" className={`${inter.variable}`}>
      <head />
      <body>
        <div className='flex flex-col min-h-screen'>
          <Navbar categories={categories} infoPages={infoPages} />
          <main className='relative flex-grow'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
