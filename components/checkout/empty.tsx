import Text from "#/components/ui/text";
import EmptyCart from "#/components/icons/empty-cart";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import clsx from "clsx";

export default function Empty({className = ''}) {
  return (
    <div className={clsx(className,"border-t border-b border-gray-300 text-center px-16 py-28 xl:py-32 flex items-center justify-center")}>
      <div>
        <EmptyCart />
        <Text variant="mediumHeading">В корзине пусто</Text>
        <p className="text-sm md:text-base leading-7 pt-2 md:pt-3.5 pb-7 md:pb-9">
          Добавьте товары из каталога
        </p>
        <Link
          href="/"
          className="text-[13px] md:text-sm lg:text-base leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 bg-heading text-white px-4 md:px-6  py-2.5 lg:py-3 hover:text-white hover:bg-gray-600 hover:shadow-cart rounded-lg"
        >
          <IoHomeSharp />
          <span className="ps-1.5">В каталог</span>
        </Link>
      </div>
    </div>
  );
}
