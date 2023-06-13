import Container from "#/components/ui/container";
import Breadcrumb from "#/components/layout/breadcrumb";
// import { ShopFilters } from "#/components/ui/filters";
import ProductGrid from "#/components/product/product-grid";
import { getProducts } from '#/lib'

export default async function Category({params}:any) {
  const products = await getProducts(params.category_id);
  console.log(products);

  return (
    <>
			<Container>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
							<div className="pb-7">
                <Breadcrumb/>
							</div>
							{/* <ShopFilters /> */}
					</div>

					<div className="w-full lg:-ms-9">
						{/* <SearchTopBar /> */}
						<ProductGrid products={products} />
					</div>
				</div>
			</Container>
		</>
  )
}
