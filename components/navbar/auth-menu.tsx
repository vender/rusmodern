"use client"
import { useEffect, useState } from "react";
import Modal from "#/components/modal/modal";
import dynamic from "next/dynamic";
import Link from "next/link";
const LoginForm:any = dynamic(() => import("#/components/auth/login-form"));

export default function AuthMenu({
  isAuthorized,
  className,
  btnProps,
  children,
}:any) {
	const [openModal, setOpenModal] = useState(false);
  
  useEffect(() => {
		document.body.style.overflow = openModal ? "hidden" : "unset";
	}, [openModal]);

  return isAuthorized ? (
    <Link href="/account" {...btnProps} />
  ) : (
    <>
      <button onClick={()=>setOpenModal(true)} className={className}>
        {children}
      </button>
      <Modal open={openModal} onClose={()=>setOpenModal(false)}>
        <LoginForm setOpenModal={setOpenModal} />
      </Modal>
    </>
  )
}