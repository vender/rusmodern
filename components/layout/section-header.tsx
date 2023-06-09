import Link from "next/link";

interface Props {
	sectionHeading: string;
	categorySlug?: string;
	className?: string;
}
// text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading
export default function SectionHeader({
	sectionHeading = "text-section-title",
	categorySlug,
	className = "pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8",
}:Props) {
  return (
	<div
			className={`flex items-center justify-between -mt-2 lg:-mt-2.5 ${className}`}
		>
			<h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading">{sectionHeading}</h3>
			{categorySlug && (
				<Link
					href={categorySlug}
					className="text-xs lg:text-sm xl:text-base text-heading mt-0.5 lg:mt-1"
				>
					{"text-see-all-product"}
				</Link>
			)}
		</div>
  )
}