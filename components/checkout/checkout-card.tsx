// import usePrice from "#/framework/product/use-price";
// import { useCart } from "@contexts/cart/cart.context";
import CheckoutItem from "#/components/checkout/checkout-card-item";
import CheckoutCardFooterItem from "./checkout-card-footer-item";

export default function Checkoutcard({cart}) {

  return (
		<div className="pt-12 md:pt-0 2xl:ps-4">
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				Ваш заказ
			</h2>

			{cart ? (
				cart.items.map((item) => <CheckoutItem item={item} key={item.id} />)
			) : (
				<p className="text-red-500 lg:px-3 py-4">{"text-empty-cart"}</p>
			)}

			{cart.totals.map((item: any) => (
				<CheckoutCardFooterItem item={item} key={item.code} />
			))}

		</div>
  )
}