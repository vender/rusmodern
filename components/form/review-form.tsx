"use client"
import Button from "#/components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "#/components/ui/text-area";
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
interface ReviewFormValues {
	cookie: string;
	message: string;
}

const ReviewForm = ({isLogedIn, product_id}:any) => {
	const [rating, setRating] = useState(1) as any;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<ReviewFormValues>();
	
	async function onSubmit(values: ReviewFormValues) {
		const response = await fetch(`/api/addreview`, {
			method: 'POST',
			body: JSON.stringify({
				product_id,
				text: values.message,
				rating,
				name: `${isLogedIn.firstname} ${isLogedIn.lastname}`
			})
		});
		const data:{status:number} = await response.json();
		if(data?.status == 204) {
			alert('Спасибо за отызыв.');
		}
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
		  reset({ message: "" })
		}
	}, [isSubmitSuccessful, reset])
	
	return (
		isLogedIn ? <form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full mx-auto flex flex-col justify-center"
			noValidate
		>
			<div className="flex flex-col space-y-2 md:space-y-6 lg:space-y-7">
				<div className="pb-1.5">
					<Rating
						name="simple-controlled"
						value={rating}
						onChange={(event, newValue) => {
							setRating(newValue);
						}}
					/>
				</div>
				<TextArea
					labelKey="Отзыв о товаре"
					{...register("message", { required: "Введите сообщение" })}
					errorKey={errors.message?.message}
				/>
				<div className="pt-1">
					<Button
						type="submit"
						className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
					>
						Отправить
					</Button>
				</div>
			</div>
		</form> : 
		<h3>Войдите, что бы оставить отзыв</h3>
	);
};

export default ReviewForm;
