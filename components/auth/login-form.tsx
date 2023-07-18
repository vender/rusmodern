import Input from "#/components/ui/input";
import PasswordInput from "#/components/ui/password-input";
import Button from "#/components/ui/button";
import { useForm } from "react-hook-form";
import { startTransition, useState } from "react";
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = ({setOpenModal}:any) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	
	const login = async ({ email, password, remember_me }:any) => {
		setIsLoading(true);

		const response = await fetch(`/api/user`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
			})
		});

		const data = await response.json();

		if (!data.result) {
			alert('Не верный логин или пароль');
			setIsLoading(false);
			return;
		}

		startTransition(() => {
			router.refresh();
			setIsLoading(false);
			setOpenModal(false);
		});

	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	function onSubmit({ email, password, remember_me }:any) {
		login({
			email,
			password,
			remember_me,
		});
		console.log(email, password, remember_me, "data");
	}
	function handleSignUp() {
		// setModalView("SIGN_UP_VIEW");
		// return openModal();
	}
	function handleForgetPassword() {
		// setModalView("FORGET_PASSWORD");
		// return openModal();
	}
	return (
		<div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
			<div className="text-center mb-6 pt-2.5">
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					Введите свои данные
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-3.5">
					<Input
						labelKey="Email"
						type="email"
						variant="solid"
						{...register("email", {
							required: `${"Введите ваш email"}`,
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "Введите ваш email",
							},
						})}
						errorKey={errors.email?.message as string}
					/>
					<PasswordInput
						labelKey="Пароль"
						errorKey={errors.password?.message as string}
						{...register("password", {
							required: `Введите пароль`,
						})}
					/>
					<div className="flex items-center justify-center">
						<div className="flex items-center flex-shrink-0">
							<label className="switch relative inline-block w-10 cursor-pointer">
								<input
									id="remember"
									type="checkbox"
									className="opacity-0 w-0 h-0"
									{...register("remember_me")}
								/>
								<span className="bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round"></span>
							</label>
							<label
								htmlFor="remember"
								className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
							>
								Запомнить меня
							</label>
						</div>
						<div className="flex ms-auto">
							<button
								type="button"
								onClick={handleForgetPassword}
								className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
							>
								Забыли пароль?
							</button>
						</div>
					</div>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-11 md:h-12 w-full mt-1.5"
						>
							Войти
						</Button>
					</div>
				</div>
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					ИЛИ
				</span>
			</div>
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				Не зарегистрированы?
				<button
					type="button"
					className="text-sm sm:text-base ml-2 text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignUp}
				>
					Регистрация
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
