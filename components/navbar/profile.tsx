"use client"
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from 'next/image'

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

export default function Profile() {
  return (
    <Menu as="div" className="relative ml-3">
        <div>
        <Menu.Button as='button' className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <Image
                className="h-8 w-8 rounded-full"
                width={38}
                height={32}
                src="/images/photo-user.jpeg"
                alt=""
            />
        </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                {({ active }) => (
                    <a
                    id='1'
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                    Your Profile
                    </a>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <a
                    id='2'
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                    Settings
                    </a>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <a
                    id='3'
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                    Sign out
                    </a>
                )}
                </Menu.Item>
            </Menu.Items>
        </Transition>
    </Menu>
  )
}
