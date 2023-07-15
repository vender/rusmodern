import Container from "#/components/ui/container";
import Breadcrumb from "#/components/layout/breadcrumb";
import ProductGrid from "#/components/product/product-grid";
import { getCategory, getProducts } from '#/lib'
import ShopFilters from "#/components/ui/filters";
import SearchTopBar from "#/components/ui/top-bar";
// import { Metadata, ResolvingMetadata } from 'next'

type Props = {
	params: { id: string, category_id: number }
}

export async function generateMetadata(
	{ params }: Props,) {
	const category = await getCategory(params.category_id);
   
	return {
	  title: category.name,
	  openGraph: {
		images: [`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${category?.image}`],
		description: category.description,
	  },
	}
  }

const uniqArray = (array: any) => {
	return array.map(JSON.stringify)
		.filter((item: any, index: any, arr: any) => arr.indexOf(item, index + 1) === -1)
		.map(JSON.parse);		
}

const removeAttrib = [209,252,219,30,27,16,143,20,153,15,29,215,162,28,19,154,25,18,26];

export default async function Category({ params }: any) {
	const products = await getProducts(params.category_id);
	const category = await getCategory(params.category_id);
	
	let attribs: any = [];
	let attribute_groups: any = [];

	products && products.map((item: any) => {
		item.attributes.map((i: any) => {
			i.attribute.map((i: any) => {
				if(!removeAttrib.find((ra)=>i.attribute_id == ra)) {
					attribute_groups.push([i.attribute_id, i.name])
				}
			});
		});
	});

	products && products.map((item: any) => {
		item.attributes.map((i: any) => {
			attribs.push(...i.attribute)
		});
	});

	return (
		<>
			<Container>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
						<div className="pb-7">
							<Breadcrumb />
						</div>
						<ShopFilters products={products} attribute_groups={uniqArray(attribute_groups)} attribs={uniqArray(attribs)} />
					</div>

					<div className="w-full lg:-ms-9">
						<SearchTopBar category={category} />
						<ProductGrid products={products} />
					</div>
				</div>
			</Container>
		</>
	)
}
