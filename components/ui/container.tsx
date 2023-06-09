import clsx from "clsx";

interface Props {
	className?: string;
	children?: any;
	el?: any;
	clean?: boolean;
}

import React from 'react'

export default function Container({
	children,
	className,
	el = "div",
	clean,
}:Props) {
	const rootClassName = clsx(className, {
		"mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16": !clean,
	});

	let Component: React.ComponentType<
		React.HTMLAttributes<HTMLDivElement>
	> = el as any;

	return <Component className={rootClassName}>{children}</Component>;
}