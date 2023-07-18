"use client"
import { useEffect, useState } from "react";
// import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import("#/components/auth/login-form"));

// const SignUpForm = dynamic(() => import("#/components/auth/sign-up-form"));
// const ForgetPasswordForm = dynamic(
// 	() => import("#/components/auth/forget-password-form")
// );

export default function ManagedModal({modalView}:any) {
	
	const displayModal = false;
	const closeModal = () => {};
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		document.body.style.overflow = openModal ? "hidden" : "unset";
	}, [openModal]);

  	return (
		<Modal open={displayModal} onClose={closeModal}>
			{modalView == "LOGIN_VIEW" && <LoginForm />}
			{/* {modalView === "SIGN_UP_VIEW" && <SignUpForm />} */}
			{/* {modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />} */}
		</Modal>
  	)
}