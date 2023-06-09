import { getProducts } from '#/lib'
import ProductCard from '#/components/productCard'
import { Suspense } from 'react';

export default async function CategoryCard({ category }:any): Promise<JSX.Element> {
  const products = await getProducts(category.category_id);

  let model: number;
  let filteredProds: any = [];
  let prodSizes: any = [];

  let Prods = products.map((item: any) => {
    if (item?.upc == 0) return item;

    if (model != item.upc.slice(0, 4)) {
      model = Number(item.upc.slice(0, 4));
      prodSizes = [];
      filteredProds[model] = item;
      return item;
    } else {
      prodSizes.push(item);
      filteredProds[model].sizes = prodSizes;
    }
  });

  return (
    Prods.length &&
      <>
        <h2 className="my-8 text-3xl font-bold text-gray-700">{category.name}</h2>

        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {Prods.map((product: any) => (product &&
            <Suspense key={product.product_id}>
              <ProductCard product={product} />
            </Suspense>
          ))}
        </div>
      </>
  )
}