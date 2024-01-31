"use client"
import { useState } from "react";
import { Collapse } from "#/components/accordion";
import ReviewForm from "#/components/form/review-form";
import { useSearchParams } from 'next/navigation'

export default function ProductMetaReview({ data, isLogedIn, prodReviews }:any) {
	const searchParams = useSearchParams();
	const open = searchParams.get('open')
	const [expanded, setExpanded] = useState<number>(open == 'review' ? 2 : 0);
	
	return (
		<>
			{data?.map((item: any, index: any) => (
				<Collapse
					i={index}
					type={item.type}
					key={item.title}
					title={item.title}
					content={item?.type == 'review' ? <ReviewForm isLogedIn={isLogedIn} product_id={item?.product_id} prodReviews={prodReviews} /> : item.content}
					expanded={expanded}
					setExpanded={setExpanded}
					variant="transparent"
				/>
			))}
		</>
	);
}