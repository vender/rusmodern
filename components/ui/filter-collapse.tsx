import React, { useState } from "react";
import { useCollapse } from 'react-collapsed'
import { CheckBox } from "#/components/ui/checkbox";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';


export default function FilterCollapse({ attrib_group, items }: any) {
  items = items.filter((item: any, idx: number) => item.attribute_id == attrib_group[0]);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: false });

  // const router = useRouter();
	// const pathname = usePathname();
	// const query = useSearchParams();
	// const selectedPrices = query?.price ? (query.price as string).split(",") : [];
	// const [formState, setFormState] = React.useState<string[]>(selectedPrices);
	// React.useEffect(() => {
	// 	setFormState(selectedPrices);
	// }, [query]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		// const { value } = e.currentTarget;
		// let currentFormState = formState.includes(value)
		// 	? formState.filter((i) => i !== value)
		// 	: [...formState, value];

		// const { price, ...restQuery } = query;
		// router.push(
		// 	{
		// 		pathname,
		// 		query: {
		// 			...restQuery,
		// 			...(!!currentFormState.length
		// 				? { price: currentFormState.join(",") }
		// 				: {}),
		// 		},
		// 	},
		// 	undefined,
		// 	{ scroll: false }
		// );
	}

  return (
    <>
      <button {...getToggleProps()}>
        {isExpanded ? `${attrib_group[1]} +` : `${attrib_group[1]} -`}
      </button>
      <section {...getCollapseProps()}>
        {items.map((item: any) => (
          <CheckBox
            key={item.id}
            label={item.text}
            name={item.text}
            // checked={formState.includes(item.slug)}
            value={item.slug}
          // onChange={handleItemClick}
          />)
        )}
      </section>
    </>
  )
}