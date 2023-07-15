import ProductCard from "#/components/product/product-card";
import Button from "#/components/ui/button";
// import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";

interface ProductGridProps {
	className?: string;
	products: any;
}

export default function ProductGrid({ className = "", products }:ProductGridProps) {
	const isLoading = false;
	const hasNextPage = true;
	
	return (
		<>
			<div
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{isLoading && !products?.length ? (
					<></>
					// <ProductFeedLoader limit={20} uniqueKey="search-product" />
				) : (
					products?.map((product:any) => (
						<ProductCard
							key={`product--key${product.id}`}
							product={product}
							variant="grid"
						/>
					))
				)}
			</div>
			<div className="text-center pt-8 xl:pt-14">
				{hasNextPage && (
					<Button
						// loading={loadingMore}
						// disabled={loadingMore}
						// onClick={() => fetchNextPage()}
						variant="slim"
					>
						{"button-load-more"}
					</Button>
				)}
			</div>
		</>
	)
}