import Text from "#/components/ui/text";

export default function SearchTopBar({category}:any) {
  return (
	<div className="flex justify-between items-center mb-7">
			<Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
				{category.name}
			</Text>
		</div>
  )
}