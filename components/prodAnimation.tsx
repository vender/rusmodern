import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx'
import Image from 'next/image'
import { RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const openSpring : any = { type: "spring", stiffness: 200, damping: 30 };
const closeSpring : any = { type: "spring", stiffness: 300, damping: 35 };

export default function OpeningAnimation ({product, openProd, setOpen}:any){
    const [selectedSize, setSelectedSize] = useState();

    return (
        // <AnimatePresence>
            openProd && (
                <>
                    {/* <motion.div 
                        className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-60 z-20"
                        initial={false}
                        animate={{ opacity: setOpen ? 1 : 0 }}
                        transition={{ duration: 2 }}
                        onClick={() => setOpen(false)}
                    /> */}
                    
                    <motion.div 
                        className="bg-[#fff] h-1/2 fixed top-5 right-5 bottom-5 left-5 z-30"
                        layoutId={product.product_id}
                        // transition={setOpen ? openSpring : closeSpring}
                    >
                        <button
                            type="button"
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                            onClick={() => setOpen(false)}
                        >
                            <span className="sr-only">Закрыть</span>
                            <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
                        </button>

                        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                            {/* <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${product.image}`}
                                    alt={product.name}
                                    width={280}
                                    height={300}
                                    className="h-full w-full object-center"
                                />
                            </div> */}
                            <div className="sm:col-span-8 lg:col-span-7">
                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>

                            <section aria-labelledby="information-heading" className="mt-2">
                                <h3 id="information-heading" className="sr-only">
                                Product information
                                </h3>

                                <p className="text-2xl text-gray-900">{product.formatted_price}</p>

                            </section>

                            <section aria-labelledby="options-heading" className="mt-10">
                                
                                {/* Sizes */}
                                <div className="mt-10">
                                    {product.sizes && (<div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-gray-900">Размер</h4>
                                    </div>)}

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <div className="grid grid-cols-4 gap-4">
                                        {product?.sizes && product.sizes.map((size:any) => (
                                            <RadioGroup.Option
                                                key={size.name}
                                                value={size}
                                                disabled={!size.in_stock}
                                                className={({ active }) =>
                                                    clsx(
                                                    size.in_stock
                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                    active ? 'ring-2 ring-indigo-500' : '',
                                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                                    )
                                                }
                                            >
                                            {({ active, checked }) => (
                                                <>
                                                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                {size.in_stock ? (
                                                    <span
                                                    className={clsx(
                                                        active ? 'border' : 'border-2',
                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                        'pointer-events-none absolute -inset-px rounded-md'
                                                    )}
                                                    aria-hidden="true"
                                                    />
                                                ) : (
                                                    <span
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                    >
                                                    <svg
                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                        viewBox="0 0 100 100"
                                                        preserveAspectRatio="none"
                                                        stroke="currentColor"
                                                    >
                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                    </svg>
                                                    </span>
                                                )}
                                                </>
                                            )}
                                            </RadioGroup.Option>
                                        ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <button
                                    type="button"
                                    // onClick={() => handleChange(product.product_id)}
                                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    В корзину
                                </button>
                            </section>
                            </div>
                        </div>

                        
                    </motion.div>
                    
                </>
            )
        // </AnimatePresence>
    )
}