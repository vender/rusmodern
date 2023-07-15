"use client"
import FilteredItem from "#/components/ui/filtered-item";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import AttribFilter from "./attrib-filter";

export default function ShopFilters({ products, attribute_groups, attribs }: any) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams: any = useSearchParams();
	let allParams: any = [];
	
	searchParams.forEach((value: any, key: any) => {
		value.split(',').filter((e: any) => e).map((i: any) => {
			allParams.push([i, key]);
		})
	});

	return (
		<div className="pt-1">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						Фильтр
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
						aria-label="очистить"
						onClick={() => {
							router.push(pathname);
						}}
					>
						очистить
					</button>
				</div>
				<div className="flex flex-wrap -m-1.5 pt-2">
					{allParams.length > 0 &&
						allParams.map((v: any, idx: any) =>
						(
							<FilteredItem
								itemKey={v[1]}
								itemValue={v[0]}
								key={idx}
							/>
						)
						)}
				</div>
			</div>

			<AttribFilter attribute_groups={attribute_groups} items={attribs} />
		</div>
	)
}