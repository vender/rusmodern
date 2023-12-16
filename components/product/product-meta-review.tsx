"use client"
import { useState } from "react";
import { Collapse } from "#/components/accordion";
// import ReviewForm from "#/components/form/review-form";

interface Props {
	data: any;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
	const [expanded, setExpanded] = useState<number>(0);
	
	return (
		<>
			{data?.map((item: any, index: any) => (
				<Collapse
					i={index}
					key={item.title}
					title={item.title}
					content={
						data?.length === item.id ? (
							<>
								{/* {item.content} <ReviewForm /> */}
							</>
						) : (
							item.content
						)
					}
					expanded={expanded}
					setExpanded={setExpanded}
					variant="transparent"
				/>
			))}
		</>
	);
};

export default ProductMetaReview;
