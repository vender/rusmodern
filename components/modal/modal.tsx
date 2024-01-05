"use client";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { fadeInOut } from "#/components/ui/motion/fade-in-out";
import { zoomOutIn } from "#/components/ui/motion/zoom-out-in";
import clsx from "clsx";

type ModalProps = {
  open?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  rootClassName?: string;
  useBlurBackdrop?: boolean;
  containerClassName?: string;
  variant?: "center" | "bottom";
};

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

// variant based classes for modal root, container & close btn
const rootClasses = {
  center: "p-4 md:p-5",
  bottom: "p-5 pb-0",
};
const containerClasses = {
  center: "h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg",
  bottom: "h-full max-h-70vh bottom-0 rounded-ts-2xl rounded-te-2xl",
};
const closeBtnClasses = {
  center: "top-4 end-4",
  bottom: "top-1/4 start-1/2 transform -translate-y-1/2 -translate-x-1/2",
};

export default function Modal({
  children,
  open,
  onClose,
  rootClassName,
  useBlurBackdrop,
  containerClassName,
  variant = "center",
}: ModalProps) {
  const modalRootRef = useRef() as DivElementRef;
  const modalInnerRef = useRef() as DivElementRef;

  return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={modalRootRef}
            key="modal"
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInOut(0.25)}
            className={clsx(
              "modal-root fixed bg-black bg-opacity-70 inset-0 z-50 cursor-pointer p-4 md:p-5",
              useBlurBackdrop && "backdrop-filter backdrop-blur-sm",
              rootClasses[variant],
              rootClassName
            )}
          >
            <motion.div
              initial="from"
              animate="to"
              exit="from"
              variants={zoomOutIn()}
              onClick={onClose}
              className="absolute w-full h-full mx-auto"
            />
              <div
                className={clsx(
                  "w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg",
                  containerClasses[variant],
                  containerClassName
                )}
              >
                <button
                  onClick={onClose}
                  aria-label="Закрыть"
                  className={clsx(
                    "fixed z-10 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white shadow text-gray-600 transition duration-200 focus:outline-none focus:text-gray-800 focus:shadow-md hover:text-gray-800 hover:shadow-md -top-3 md:-top-4 -right-3 md:-right-4",
                    closeBtnClasses[variant]
                  )}
                >
                  <IoClose className="text-xl" />
                </button>
                <div
                  ref={modalInnerRef}
                  className="h-full overflow-y-auto rounded-lg"
                  style={{ maxHeight: "calc(100vh - 140px)" }}
                >
                  {children}
                </div>
              </div>
            
          </motion.div>
        )}
      </AnimatePresence>
  );
}
