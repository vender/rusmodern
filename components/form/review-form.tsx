"use client"
import Button from "#/components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "#/components/ui/text-area";
import Rating from '@mui/material/Rating';
import Reviewlist from "#/components/product/review-list";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
interface ReviewFormValues {
	cookie: string;
	message: string;
	file: any;
}

const ReviewForm = ({isLogedIn, product_id, prodReviews}:any) => {
	const [rating, setRating] = useState(0) as any;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<ReviewFormValues>();
	
	async function onSubmit(values:any) {
		const formData = new FormData();
		formData.append('product_id', product_id);
		formData.append('text', values.message);
		// for (const key in values) {
		// 	if (key === "file") {
		// 	  formData.append(key, values[key][0]);
		// 	} else {
		// 	  formData.append(key, values[key]);
		// 	}
		// }
		formData.append('file', values.file[0]);
		formData.append('rating', rating);
		formData.append('name', `${isLogedIn.firstname} ${isLogedIn.lastname}`);
		// console.log(values.file[0]);
		
		
		const response = await fetch(`/api/addreview`, {
			method: 'POST',
			body: formData
		});


		const data:{status:number} = await response.json();
		if(data?.status == 204) {
			alert('Спасибо за отызыв.');
		}
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
		  reset({ message: "", file: "" })
		}
	}, [isSubmitSuccessful, reset])
	
	return (
		<>
			<Reviewlist prodReviews={prodReviews}/>

			{isLogedIn ? 
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center p-3 bg-gray-100 rounded-xl border border-gray-300"
			>
				<div className="flex flex-col space-y-2">
					<div className="pb-1.5 flex justify-between">
						<Rating
							name="simple-controlled"
							value={rating}
							onChange={(event, newValue) => {
								setRating(newValue);
							}}
						/>

						<label
							htmlFor="file-upload"
							className="relative flex justify-center align-middle cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
						>
							<FaCloudUploadAlt className="w-6 h-6 mr-2" />
							<span>Загрузить файл</span>
							<input {...register("file")} id="file-upload" type="file" className="sr-only" />
						</label>
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
			</form> 
			: 
			<h3>Войдите, что бы оставить отзыв</h3>}
		</>
	);
};

export default ReviewForm;
