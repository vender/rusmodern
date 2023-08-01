"use client"
import Input from "#/components/ui/input";
import Button from "#/components/ui/button";
import { useForm } from "react-hook-form";
import { startTransition, useState } from "react";
import { useRouter } from 'next/navigation';
import { editCustomer } from "#/lib";

export interface UpdateUserType {
	firstName: string;
	lastName: string;
	telephone: string;
	email: string;
}

const defaultValues = {};

export default function AccountDetails({ userInfo }:any) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateUserType>({
		defaultValues,
	});

	const handleEdit = async (firstname: string, lastname: string, email:string, telephone:string) => {
		setIsLoading(true);

		const res = await fetch(`/api/user/edit`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"charset" : "UTF-8"
			},
			body: JSON.stringify({
				firstname,
				lastname,
				email,
				telephone
			})
		});
		
		const data = await res.json();
		
		if (data.result.errors) {
			alert(data.result.errors[0].message);
			setIsLoading(false);
			return;
		}

		startTransition(() => {
			router.refresh();
			alert('Информация успешно изменена!');
			setIsLoading(false);
		});

	}

	function onSubmit(input: any) {
		const {firstName, lastName, email, telephone} = input;
		handleEdit(firstName, lastName, email, telephone);
	}
	

	return (
		<div
			className="w-full flex flex-col"
		>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				Информация об аккаунте
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 sm:space-y-5">
					<div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
						<Input
							labelKey="Имя"
							{...register("firstName", {
								required: "Введите имя",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message as string}
							defaultValue={userInfo?.firstname}
						/>
						<Input
							labelKey="Фамилия"
							{...register("lastName", {
								required: "Введите фамилию",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.lastName?.message as string}
							defaultValue={userInfo?.lastname}
						/>
					</div>
					<div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
						<Input
							type="tel"
							labelKey="Номер телефона"
							{...register("telephone", {
								required: "Введите телефон",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.telephone?.message as string}
							defaultValue={userInfo?.telephone}
						/>
						<Input
							type="email"
							labelKey="E-mail"
							{...register("email", {
								required: "forms:email-required",
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Введите e-mail",
								},
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.email?.message as string}
							defaultValue={userInfo?.email}
						/>
					</div>

					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-12 mt-3 w-full sm:w-32"
						>
							Сохранить
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}