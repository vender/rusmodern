import Container from "#/components/ui/container";
import { cookies } from "next/headers";
import { getCart } from "#/lib";
import CheckoutForm from "#/components/checkout/checkout-form";
import CheckoutCard from "#/components/checkout/checkout-card";
import Empty from "#/components/checkout/empty";

export default async function CheckoutPage() {
  let sessionId = cookies().get("x-session-id")?.value;
  let cart: any;

  if (sessionId) {
    cart = await getCart();
  }  

  return (
    <Container>
		{cart.items.length > 0 ? 
			<div className="pb-14 py-28 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
				<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
					<CheckoutForm />
				</div>
				<div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
					<CheckoutCard cart={cart} />
				</div>
			</div>
		: <Empty />}
    </Container>
  );
}