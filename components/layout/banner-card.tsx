import Image from "next/image";
import { useWindowSize } from 'react-use';
import clsx from "clsx";
import Link, { LinkProps } from "next/link";

interface BannerProps {
	banner: any;
	variant?: "rounded" | "default";
	effectActive?: boolean;
	className?: string;
	classNameInner?: string;
	href: LinkProps["href"];
}

function getImage(deviceWidth: number, imgObj: any) {
	return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}


export default function BannerCard({
	banner,
	className,
	effectActive = false,
	classNameInner,
	href,
}:BannerProps) {
	const { width } = useWindowSize();
	const { title, image } = banner;
	const selectedImage = getImage(width, image);

	return (
		<div className={clsx("mx-auto", className)}>
			<Link
				href={href}
				className={clsx(
					"h-full group flex justify-center relative overflow-hidden",
					classNameInner
				)}
			>
				<Image
					src={selectedImage.url}
					width={selectedImage.width}
					height={selectedImage.height}
					alt={title}
					quality={100}
					className="bg-gray-300 w-full rounded"
				/>
				{effectActive && (
					<div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
				)}
			</Link>
		</div>
	)
}