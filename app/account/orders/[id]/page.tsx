import AccountLayout from "#/components/account/account-layout";
import OrderDetails from "#/components/account/order-details";

export default function OrderPage() {
	return (
		<AccountLayout>
			<OrderDetails className="p-0" />
		</AccountLayout>
	);
}