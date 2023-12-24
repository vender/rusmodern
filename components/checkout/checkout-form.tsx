"use client"
import Input from "#/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import TextArea from "#/components/ui/text-area";
// import CheckBox from "#/components/ui/checkbox";
import Button from "#/components/ui/button";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useId, useState, startTransition } from "react";
// import { useRouter } from 'next/navigation';
import { RadioBox } from "../ui/radiobox";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";

interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	// city: string;
	// zipCode: string;
	save: boolean;
	note: string;
	payment_method: string;
	shipping_method: string;
}

interface sendConfirmOrder {
	result: {
		payment: string;
	};
	status: number;
}

export default function CheckoutForm({ address, userInfo, paymentMethods, shipingMethods }: any) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();
	
	const id = useId();
	// const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [value, setValue] = useState(address && address[0]?.address_1) as any;
	const [payForm, setPayForm] = useState('');
	
	const setPaymentMethod = async (code:string, comment:string) => {		
		const response = await fetch(`/api/checkout/set-payment-method`, {
			method: 'POST',
			body: JSON.stringify({
				code,
				comment,
			})
		});
		
		const data:{result:boolean,status:number} = await response.json();
		return data;
	}
	
	const setShippingMethod = async (code:string) => {
		const response = await fetch(`/api/checkout/set-shipping-method`, {
			method: 'POST',
			body: JSON.stringify({
				code,
			})
		});

		const data:{status: number} = await response.json();
		return data;
	}

	const confirmOrder = async () => {
		const response = await fetch(`/api/checkout/confirm`, {
			method: 'GET'
		});

		const data:{status: number} = await response.json();
		return data;
	}
	
	const router = useRouter();

	async function onSubmit(input: CheckoutInputType) {
		setIsLoading(true);

		const setPayShip = await Promise.all([setPaymentMethod(input.payment_method, input.note), setShippingMethod(input.shipping_method)]);
		// if(setPayShip) {
			const sendConfirmOrder = await confirmOrder() as sendConfirmOrder;
		// }

		console.log(sendConfirmOrder.result.payment);

		if(sendConfirmOrder?.result?.payment) {
			router.push(sendConfirmOrder.result.payment);
			// redirect('/');
		}

		// if (data.status == 204) {
		// 	setIsLoading(false);
		// 	return;
		// }
		// console.log(input);
	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				Покупатель
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="Имя"
							{...register("firstName", {
								required: "Введите имя",
							})}
							errorKey={errors.firstName?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
							defaultValue={userInfo?.firstname}
							disabled={isLoading}
						/>

						<Input
							labelKey="Фамилия"
							{...register("lastName", {
								required: "Введите фамилию",
							})}
							errorKey={errors.lastName?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
							defaultValue={userInfo?.lastname}
							disabled={isLoading}
						/>
					</div>

					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="E-Mail"
							{...register("email", {
								required: "Введите E-Mail",
							})}
							errorKey={errors.email?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
							defaultValue={userInfo?.email}
							disabled={isLoading}
						/>

						<Input
							type="tel"
							labelKey="Телефон"
							{...register("phone", {
								required: "Введите телефон",
							})}
							errorKey={errors.phone?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
							defaultValue={userInfo?.telephone}
							disabled={isLoading}
						/>
					</div>

					<label htmlFor="address" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Адрес доставки</label>
					<Controller
						name="address"
						control={control}
						// rules={{ required: "Введите адрес" }}
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
					{errors.address && <p className="my-2 text-xs text-red-500">{errors.address?.message}</p>}

					{/* <div className="relative flex items-center ">
						<CheckBox name="Сохранить информацию" />
					</div> */}

					<h3 className="text-lg md:text-xl xl:text-xl font-bold text-heading mb-6 xl:mb-8">
						Способ доставки
					</h3>

					{shipingMethods && shipingMethods.map((shipping:any, idx:number)=>
						<RadioBox 
							key={shipping?.code} 
							labelKey={shipping.title}
							{...register("shipping_method", {
								required: "Выберите способ доставки",
							})}
							value={shipping?.code}
							// defaultChecked={idx == 0 ? true : false}
							data-shipcode={shipping?.code}
							// onChange={(e:any) => setShippingMethod(e.target?.dataset.shipcode)}
							// onClick={(e:any) => setShippingMethod(e.target?.dataset.shipcode)}
						/>
					)}
					{errors.shipping_method && <p className="my-2 text-xs text-red-500">{errors.shipping_method?.message}</p>}


					<h3 className="text-lg md:text-xl xl:text-xl font-bold text-heading mb-6 xl:mb-8">
						Способ оплаты
					</h3>

					{paymentMethods && paymentMethods.map((payment:any, idx:number)=> {
						return <RadioBox 
							key={payment?.code}
							labelKey={payment.title}
							{...register("payment_method", {
								required: "Выберите способ оплаты",
							})}
							value={payment?.code}
							// defaultChecked={idx == 0 ? true : false}
							data-paycode={payment?.code}
							// onChange={(e:any) => setPaymentMethod(e.target?.dataset.paycode, '')}
							// onClick={}
						/>
					})}
					{errors.payment_method && <p className="my-2 text-xs text-red-500">{errors.payment_method?.message}</p>}

					<TextArea
						labelKey="Коментарий к заказу"
						{...register("note")}
						placeholderKey=""
						className="relative pt-3 xl:pt-6"
					/>
					<div className="flex w-full">
						{payForm ? parse(payForm) : <Button
							type="submit"
							loading={isLoading}
							className="w-full sm:w-auto"
							disabled={isLoading}
						>
							Оформить заказ
						</Button>}
					</div>
				</div>
			</form>
		</>
	)
}