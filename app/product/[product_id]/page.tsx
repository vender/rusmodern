import { getProduct } from '#/lib'
import Container from "#/components/ui/container";
import ProductSingleDetails from "#/components/product/product-single-details";
// import RelatedProducts from "@containers/related-products";
import Divider from "#/components/ui/divider";
import Breadcrumb from "#/components/layout/breadcrumb";

type Props = {
	params: { product_id: number }
}

export async function generateMetadata(
	{ params }: Props,) {
    const product = await getProduct(params.product_id);
   
	return {
	  title: product.name,
	  openGraph: {
		images: [`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${product?.image}`],
		description: product.description,
	  },
	}
}

export default async function ProductPage({ params }: { params: { product_id: number } }) {
    const product = await getProduct(params.product_id);
    return (
        <>
            <Divider className="mb-0" />
            <Container>
                <div className="pt-8">
                    <Breadcrumb parent={product.categories[0]} title={false}/>
                </div>
                <ProductSingleDetails product={product} />
                {/* <RelatedProducts sectionHeading="text-related-products" /> */}
            </Container>
        </>
    )
}
