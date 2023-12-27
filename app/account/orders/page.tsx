import OrdersTable from "#/components/account/orders-table";
import { getOrders } from "#/lib";

export default async function OrdersTablePage() {
	const orders = await getOrders(0, 10);

	return <OrdersTable orders={orders} />
}