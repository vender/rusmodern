import Link from "next/link";
import LogoIcon from '#/components/icons/logoIcon';
import clsx from "clsx";

export default function Logo({className, href, width, height}:{className: string, href: string, width: number, height: number}) {
  return (
        <Link href={href} aria-label="На главную" className={clsx(className, 'transition-transform hover:scale-105')}>
            <LogoIcon width={width} height={height} />
        </Link>
  )
}