import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  className?: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
}

export default function AuthMenu({
  isAuthorized,
  href,
  className,
  btnProps,
  children,
}:any) {
  return isAuthorized ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <button {...btnProps} />
  )
}