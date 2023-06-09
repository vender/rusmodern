import { getCategories, getBanners, getlatestProducts } from '#/lib'
// import ProductGridItems from "#/components/layout/product-grid-items";
import Banners from "#/components/layout/banners";
import BannerCarouselBlock from "#/components/layout/banner-carousel-block";
import CategoryBlock from "#/components/layout/category-block";
import NewArrivalsProductFeed from "#/components/product/feeds/new-arrivals-product-feed";
import Divider from "#/components/ui/divider";
import Footer from '#/components/footer/footer';

export default async function Home() {
  const categories = await getCategories(0);
  const banners = await getBanners('common/home');
  const latestProducts = await getlatestProducts();
  
  return (
    <>
      <Banners banners={banners} />
      <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
        <BannerCarouselBlock />
        <CategoryBlock categories={categories} type="rounded" sectionHeading="Категории товаров" />
        <NewArrivalsProductFeed latestProducts={latestProducts} />
        {/* <Divider /> */}
        {/* <ProductGridItems categories={categories} /> */}
      </div>
      <Footer />
    </>
  )
}