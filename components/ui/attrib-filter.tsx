import FilterCollapse from "./filter-collapse";

export default function AttribFilter({ attribute_groups, items }: any) {
	
	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<div className="mt-2 flex flex-col space-y-4">
				{attribute_groups?.map((item: any, idx: any) => (
					<FilterCollapse key={idx} attrib_group={item} items={items} />
				))}
			</div>
		</div>
	)
}