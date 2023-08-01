"use client"
import PasswordInput from "#/components/ui/password-input";
import Button from "#/components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "#/components/ui/motion/fade-in-top";
import { startTransition, useState } from "react";
import { useRouter } from 'next/navigation';

const defaultValues = {
	newPassword: "",
	confirm: ""
};

export default function ChangePassword() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	
	const changePassword = async (password:string, confirm:string) => {
		setIsLoading(true);

		const res = await fetch(`/api/user/change-password`, {
			method: 'POST',
			body: JSON.stringify({
				password,
				confirm,
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
			alert('Пароль успешно изменен!');
			setIsLoading(false);
		});

	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues,
	});
	function onSubmit(input:any) {
		const {newPassword, confirm} = input;		
		changePassword(newPassword, confirm);
	}
	
	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				Изменение пароля
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex  h-full lg:w-8/12 flex-col`}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full mx-auto flex flex-col justify-center "
				>
					<div className="flex flex-col space-y-3">
						<PasswordInput
							labelKey="Новый пароль"
							errorKey={errors.newPassword?.message}
							{...register("confirm", {
								required: "введите пароль",
							})}
							className="mb-4"
						/>
						<PasswordInput
							labelKey="Подтвердите пароль"
							errorKey={errors.confirm?.message}
							{...register("newPassword", {
								required: "введите пароль",
							})}
							className="mb-4"
						/>

						<div className="relative">
							<Button
								type="submit"
								loading={isLoading}
								disabled={isLoading}
								className="h-13 mt-3"
							>
								Изменить пароль
							</Button>
						</div>
					</div>
				</form>
			</motion.div>
		</>
	);
};