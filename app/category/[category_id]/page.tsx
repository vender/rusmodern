import Container from "#/components/ui/container";
import Breadcrumb from "#/components/layout/breadcrumb";
import ProductGrid from "#/components/product/product-grid";
import { getProducts } from '#/lib'
import ShopFilters from "#/components/ui/filters";

const uniqArray = (array: any) => {
	return array.map(JSON.stringify)
		.filter((item: any, index: any, arr: any) => arr.indexOf(item, index + 1) === -1)
		.map(JSON.parse);
}

export default async function Category({ params }: any) {
	const products = await getProducts(params.category_id);
	
	let attribs: any = [];
	let attribute_groups: any = [];

	products && products.map((item: any, idx: number, arr: any[]) => {
		item.attributes.map((i: any) => {
			i.attribute.map((i: any) => attribute_groups.push([i.attribute_id, i.name]));
		});
	});

	products && products.map((item: any, idx: number, arr: any[]) => {
		item.attributes.map((i: any) => attribs.push(...i.attribute));
	});

	return (
		<>
			<Container>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
						<div className="pb-7">
							<Breadcrumb />
						</div>
						{/* <ShopFilters products={products} attribute_groups={uniqArray(attribute_groups)} attribs={uniqArray(attribs)} /> */}
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
