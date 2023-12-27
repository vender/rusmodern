"use client"
import Input from "#/components/ui/input";
import PasswordInput from "#/components/ui/password-input";
import Button from "#/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { AddressSuggestions } from 'react-dadata';
import { useRouter } from 'next/navigation';
import { useId, useState } from "react";
import { useCookies } from 'react-cookie';

export default function SignUpForm({addressShow, className = ''}:{addressShow:boolean, className: string}) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const [, setCookie] = useCookies(['x-session-id']);
	const [value, setValue] = useState() as any;

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm() as any;

	const id = useId();

	const signUp =async (params:any) => {
		// setIsLoading(true);
		
		const response = await fetch(`/api/user/signup`, {
			method: 'POST',
			body: JSON.stringify({
				firstname: params.firstname,
				lastname: params.lastname,
				email: params.email,
				address: params.address,
				password: params.password,
				city: value.data.city,
				postcode: value.data.postal_code
			})
		});

		const data = await response.json();

		if (data?.result?.errors) {
			alert(data?.result?.errors[0].message);
			setIsLoading(false);
			return;
		}
		
		if(data?.result?.register) {
			console.log(data?.result?.register);
			setCookie('x-session-id', data?.result?.register, {
				path: '/',
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production'
			});
			router.refresh();
			setIsLoading(false);
			alert('Вы успешно зарегистрировались');
		}
	}

	function onSubmit(input:any) {
		signUp(input);
	}
	return (
		<div className={`py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg ${className} border border-gray-300`}>
			<h2 className="text-center mb-6 pt-2.5 font-bold text-lg">Регистрация пользователя</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">
					<Input
						labelKey="Имя"
						type="text"
						variant="solid"
						{...register("firstname", {
							required: "Введите имя",
						})}
						errorKey={errors.firstname?.message}
					/>
					<Input
						labelKey="Фамилия"
						type="text"
						variant="solid"
						{...register("lastname", {
							required: "Введите фамилию",
						})}
						errorKey={errors.firstname?.message}
					/>
					<Input
						labelKey="Email"
						type="email"
						variant="solid"
						{...register("email", {
							required: "Введите email",
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "не верный email",
							},
						})}
						errorKey={errors.email?.message}
					/>
					

					{addressShow && 
					<>
						<label htmlFor="address" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Адрес доставки</label>
					
						<Controller
							control={control}
							{...register("address", {
								required: "Введите адрес",
							})}
							render={({ field }) =>
								<AddressSuggestions token="2cd34967db3481dfbeb3c3bffa23072f5fbedcfe" defaultQuery={value} uid={id} onChange={setValue}
									inputProps={
										{
											className: 'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12',
											...field
										}
									}
								/>}
						/>
					</>
					}

					{errors.address && <p className="my-2 text-xs text-red-500">{errors.address?.message}</p>}
					
					<PasswordInput
						labelKey="Пароль"
						errorKey={errors.password?.message}
						{...register("password", {
							required: "Введите пароль",
						})}
					/>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-11 md:h-12 w-full mt-2"
						>
							Зарегистрироваться
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}