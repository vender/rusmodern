"use client"
import { useState } from "react";
import { Collapse } from "#/components/accordion";
import ReviewForm from "#/components/form/review-form";

export default function ProductMetaReview({ data, isLogedIn, prodReviews }:any) {
	const [expanded, setExpanded] = useState<number>(0);
	
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