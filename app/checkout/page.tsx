import Container from "#/components/ui/container";
import { cookies } from "next/headers";
import { getCart, getAddresses, loggedIn, getShippingMethods, getPaymentMethods } from "#/lib";
import CheckoutForm from "#/components/checkout/checkout-form";
import CheckoutCard from "#/components/checkout/checkout-card";
import Empty from "#/components/checkout/empty";

const decodeAddres = async (addres:string) => {
	const url = "https://cleaner.dadata.ru/api/v1/clean/address";
	const token = "2cd34967db3481dfbeb3c3bffa23072f5fbedcfe";
	const secret = "150e2a153b86bc86f0e95dd232edf8431f74ce98";

	var options = {
		method: "POST",
		// mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Token " + token,
			"X-Secret": secret
		},
		body: JSON.stringify([addres])
	}

	const resp = await fetch(url, options)
	
	return resp.json();
}

export default async function CheckoutPage() {
  let sessionId = cookies().get("x-session-id")?.value;
  let cart: any,
  address : any,
  userAddress: any,
  userInfo: any;

  const paymetMethods = await getPaymentMethods();
  const shipingMethods = await getShippingMethods();

  if (sessionId) {
    cart = await getCart();
	userAddress = await getAddresses();
	userInfo = await loggedIn();
	// if(userAddress) {
	// 	const query = `${userAddress[0]?.city} ${userAddress[0]?.address_1}`
	// 	address = await decodeAddres(query);
	// }
  }

  return (
    <Container>
		{cart.items.length > 0 ? 
			<div className="pb-14 py-28 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
				<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
					<CheckoutForm address={userAddress} userInfo={userInfo} paymetMethods={paymetMethods} shipingMethods={shipingMethods} />
				</div>
				<div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
					<CheckoutCard cart={cart} />
				</div>
			</div>
		: <Empty />}
    </Container>
  );
}
