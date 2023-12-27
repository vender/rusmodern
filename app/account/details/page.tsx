import AccountDetails from "#/components/account/account-details";
import { editCustomer, loggedIn } from "#/lib";

export default async function AccountDetailsPage() {
	const userInfo = await loggedIn();
	
	return <AccountDetails userInfo={userInfo} />
}