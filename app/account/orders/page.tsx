// import Layout from "#/components/layout/layout";
import AccountLayout from "#/components/account/account-layout";
import OrdersTable from "#/components/account/orders-table";
import { getOrders } from "#/lib";

export default async function OrdersTablePage() {
	const orders = await getOrders(0, 10);

	return (
		<AccountLayout>
			<OrdersTable orders={orders} />
		</AccountLayout>
	);
}