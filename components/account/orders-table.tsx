"use client"
import { motion } from "framer-motion";
import { fadeInTop } from "#/components/ui/motion/fade-in-top";
import { useWindowSize } from "react-use";
import Link from "next/link";

export default function OrdersTable({orders}:any) {
	const { width } = useWindowSize();
	
	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				Заказы
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex flex-col`}
			>
				{width >= 1025 ? (
					<table>
						<thead className="text-sm lg:text-base">
							<tr>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
									Номер
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									Дата
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									Статус
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									Сумма
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
									
								</th>
							</tr>
						</thead>
						<tbody className="text-sm lg:text-base">
							{orders.map((order:any)=>(
								<tr key={order.order_id} className="border-b border-gray-300 last:border-b-0">
									<td className="px-4 py-5 text-start">
										<Link
											href={`/my-account/orders/${order.order_id}`}
											className="underline hover:no-underline text-body"
										>
											{order.order_id}
										</Link>
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{order.date_added}
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{order.order_status}
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
									{Math.round(order.total)} ₽
									</td>
									<td className="text-end px-4 py-5 text-heading">
										<Link
											href={`/my-account/orders/${order.order_id}`}
											className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
										>
											Открыть
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="w-full space-y-4">
						{orders.map((order:any)=>(
							<ul key={order.order_id} className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
								<li className="flex items-center justify-between">
									Номер
									<span className="font-normal">
										<Link
											href={`/my-account/orders/${order.order_id}`}
											className="underline hover:no-underline text-body"
										>
											{order.order_id}
										</Link>
									</span>
								</li>
								<li className="flex items-center justify-between">
									{order.date_added}
									<span className="font-normal">March 18, 2021</span>
								</li>
								<li className="flex items-center justify-between">
									Статус
									<span className="font-normal">{order.order_status}</span>
								</li>
								<li className="flex items-center justify-between">
									Сумма
									<span className="font-normal">{Math.round(order.total)} ₽</span>
								</li>
								<li className="flex items-center justify-between">
									
									<span className="font-normal">
										<Link
											href={`/my-account/orders/${order.order_id}`}
											className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
										>
											Открыть
										</Link>
									</span>
								</li>
							</ul>
						))}
					</div>
				)}
			</motion.div>
		</>
	);
};