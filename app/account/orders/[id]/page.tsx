import OrderDetails from "#/components/account/order-details";
import { getOrder } from "#/lib";

export default async function OrderPage({params}:{params:{id:number}}) {
	const order = await getOrder(params.id);
	
	return <OrderDetails order={order} className="p-0" />
}