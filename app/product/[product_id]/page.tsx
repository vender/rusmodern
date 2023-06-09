import { getProduct } from '#/lib'
import Container from "#/components/ui/container";
import ProductSingleDetails from "#/components/product/product-single-details";
// import RelatedProducts from "@containers/related-products";
import Divider from "#/components/ui/divider";
import Breadcrumb from "#/components/layout/breadcrumb";

export default async function ProductPage({ params }: { params: { product_id: number } }) {
    const product = await getProduct(params.product_id);
    return (
        <>
            <Divider className="mb-0" />
            <Container>
                <div className="pt-8">
                    <Breadcrumb/>
                </div>
                <ProductSingleDetails product={product} />
                {/* <RelatedProducts sectionHeading="text-related-products" /> */}
            </Container>
        </>
    )
}
