"use client"
import { useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import Modal from "./modal";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import("#/components/auth/login-form"));

export default function ManagedModal({modalView}:any) {
	
	const displayModal = false;
	const closeModal = () => {};
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		document.body.style.overflow = openModal ? "hidden" : "unset";
	}, [openModal]);

  	return (
		createPortal(<Modal open={displayModal} onClose={closeModal}>
			{modalView == "LOGIN_VIEW" && <LoginForm />}
		</Modal>, document.body)
  	)
}