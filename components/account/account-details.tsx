"use client"
import Input from "#/components/ui/input";
import Button from "#/components/ui/button";
import { useForm } from "react-hook-form";
import { RadioBox } from "#/components/ui/radiobox";

export interface UpdateUserType {
	firstName: string;
	lastName: string;
	displayName: string;
	phoneNumber: string;
	email: string;
	password: string;
	confirmPassword: string;
	gender: string;
}

const defaultValues = {};
const AccountDetails: React.FC = () => {
	// const { mutate: updateUser, isLoading } = useUpdateUserMutation();
	const isLoading = false;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateUserType>({
		defaultValues,
	});
	function onSubmit(input:any) {
		// updateUser(input);
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
							labelKey="forms:label-first-name"
							{...register("firstName", {
								required: "forms:first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message as string}
						/>
						<Input
							labelKey="forms:label-last-name"
							{...register("lastName", {
								required: "forms:last-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.lastName?.message as string}
						/>
					</div>
					<Input
						labelKey="forms:label-display-name"
						{...register("displayName", {
							required: "forms:display-name-required",
						})}
						variant="solid"
						errorKey={errors.displayName?.message as string}
					/>
					<div className="flex flex-col sm:flex-row sm:gap-x-3 space-y-4 sm:space-y-0">
						<Input
							type="tel"
							labelKey="forms:label-phone"
							{...register("phoneNumber", {
								required: "forms:phone-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.phoneNumber?.message as string}
						/>
						<Input
							type="email"
							labelKey="forms:label-email-star"
							{...register("email", {
								required: "forms:email-required",
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "forms:email-error",
								},
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.email?.message as string}
						/>
					</div>
					<div className="relative flex flex-col">
						<span className="mt-2 text-sm text-heading font-semibold block pb-1">
							common:text-gender
						</span>
						<div className="mt-2 flex items-center space-s-6">
							<RadioBox
								labelKey="forms:label-male"
								{...register("gender")}
								value="male"
							/>
							<RadioBox
								labelKey="forms:label-female"
								{...register("gender")}
								value="female"
							/>
						</div>
					</div>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-12 mt-3 w-full sm:w-32"
						>
							common:button-save
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AccountDetails;
