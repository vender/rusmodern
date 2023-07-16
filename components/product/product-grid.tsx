import ProductCard from "#/components/product/product-card";
// import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";

interface ProductGridProps {
  className?: string;
  products: any;
  filterdProd?: any;
}

export default function ProductGrid({
  className = "",
  products,
  filterdProd,
}: ProductGridProps) {
  const isLoading = false;

  if (filterdProd.length) {
    products = products.filter((product: any) =>
      filterdProd.find((id: any) => id == product.product_id)
    );
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
    >
      {isLoading && !products?.length ? (
        <></>
      ) : (
        // <ProductFeedLoader limit={20} uniqueKey="search-product" />
        products?.map((product: any) => {
          return (
            <ProductCard
              key={`key${product.id}`}
              product={product}
              variant="grid"
            />
          );
        })
      )}
    </div>
  );
}
