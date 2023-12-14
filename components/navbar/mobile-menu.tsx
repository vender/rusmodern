"use client"
import React, { useState } from 'react'
// import { motion } from 'framer-motion';
import "rc-drawer/assets/index.css";
import MenuIcon from "#/components/icons/menu-icon";
// import Link from 'next/link';
// import { IoClose } from "react-icons/io5";
// import { fadeInOut } from "#/components/ui/motion/fade-in-out";
// import clsx from "clsx";
import Drawer from 'rc-drawer';
import motionProps from '#/components/ui/motion/motion';
import MobileMenuTree from './mobile-menu-tree';

export default function Mobiledrawer({mainMenu}:any) {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    
    return (
        <>
            <Drawer
                open={cartIsOpen}
                placement="left"
                onClose={() => setCartIsOpen(false)}
                {...motionProps}
            >
                <div className="flex flex-col justify-between w-full h-full">
                    <MobileMenuTree cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} mainMenu={mainMenu} />
                </div>
            </Drawer>

            <button
                aria-label="Menu"
                className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
                onClick={() => setCartIsOpen(true)}
                >
                <MenuIcon />
            </button>
        </>
    )
}
