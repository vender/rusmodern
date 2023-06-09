"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import Spin from '#/components/spin'
// import ProductPopup from '#/components/productPopup'
import { motion, AnimatePresence } from 'framer-motion';
import OpeningAnimation from '#/components/prodAnimation'
import ToCartPlus from '#/components/icons/to-cart-plus'


export default function ProductCard({product}:any) {
  // const [selectedVariantId, setSelectedVariantId] = useState();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [openProd, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const isMutating = adding || isPending;

  async function handleAdd(product_id : number, quantity : number) {
    // if (!availableForSale) return;

    if(!product?.sizes) {
      setAdding(true);

      const response = await fetch(`/api/cart`, {
        method: 'POST',
        body: JSON.stringify({
          product_id,
          quantity
        })
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      setAdding(false);

      startTransition(() => {
        router.refresh();
      });
    } else {
      setOpen(true);
    }
  }

  return (
    <>
        {product?.sizes && <OpeningAnimation product={product} openProd={openProd} setOpen={setOpen} />}

        {/* <AnimatePresence> */}
          <motion.div 
            className="group p-[12px] bg-white rounded-3xl"
            layoutId={product.product_id}
            // onClick={() => setOpen(true)}
          >
              <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-3xl bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <Image
                    src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${product.image}`}
                    alt={product.name}
                    width={280}
                    height={280}
                    className="object-cover object-center group-hover:opacity-75"
                />
              </div>
              <p className="mt-2 text-xl font-medium text-gray-900">{product.formatted_price}</p>
              <h3 className="mt-2 text-sm text-gray-700">{product.name}</h3>
              <div className="flex pt-4 text-center">
                <button 
                  type="button"
                  disabled={isMutating}
                  onClick={() => handleAdd(product.product_id, 1)}
                  className="inline-flex justify-center w-full rounded-2xl bg-[#F5F4F2] select-none bg-opacity-75 px-4 py-2 text-[#21201F] focus:opacity-100 group-hover:opacity-100">
                    {isMutating ? <Spin className="text-black" /> : <><ToCartPlus /><span className='ml-1 text-base leading-[1.4rem]'>Добавить</span></>}
                </button>
              </div>
          </motion.div>
        {/* </AnimatePresence> */}
    </>
  )
}
