// import Link from "@components/ui/link";
// import Layout from "#/components/layout/layout";
import AccountLayout from "#/components/account/account-layout";
import Link from "next/link";

export default function index(props:any) {
	
	return (
		<AccountLayout>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
				text-dashboard
			</h2>
			<p className=" text-sm leading-7 md:text-base md:leading-loose lowercase">
				text-account-dashboard
				<Link
					href="#"
					className="text-heading underline font-semibold"
				>
					text-recent-orders
				</Link>
				, text-manage-your
				<Link
					href="#"
					className="text-heading underline font-semibold"
				>
					text-account-details
				</Link>{" "}
				text-and
				<Link
					href="#"
					className="text-heading underline font-semibold"
				>
					text-change-your-password
				</Link>
				.
			</p>
			<>{props.orders}</>
		</AccountLayout>
	)
}