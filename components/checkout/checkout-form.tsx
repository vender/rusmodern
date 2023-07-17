"use client"
import Input from "#/components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "#/components/ui/text-area";
import CheckBox from "#/components/ui/checkbox";
import Button from "#/components/ui/button";

interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	zipCode: string;
	save: boolean;
	note: string;
}

const CheckoutForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();

	function onSubmit(input: CheckoutInputType) {
		console.log(input);
		// updateUser(input);
		// Router.push(ROUTES.ORDER);
	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				Адрес доставки
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
						/>
					</div>
					<Input
						labelKey="Адрес"
						{...register("address", {
							required: "Введите адрес",
						})}
						errorKey={errors.address?.message}
						variant="solid"
					/>
					<div className="relative flex items-center ">
						<CheckBox name="Сохранить информацию" />
					</div>
					<TextArea
						labelKey="Коментарий к заказу"
						{...register("note")}
						placeholderKey=""
						className="relative pt-3 xl:pt-6"
					/>
					<div className="flex w-full">
						<Button
							className="w-full sm:w-auto"
							// loading={isLoading}
							// disabled={isLoading}
						>
							Оформить заказ
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default CheckoutForm;
