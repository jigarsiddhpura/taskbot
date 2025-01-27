"use client"

import { Navbar, NavbarBrand, NavbarContent, Button, Avatar } from "@heroui/react"
import Image from "next/image"

interface NavbarProps {
    user: { name: string; avatar: string }
}

export function TaskBotNavbar({ user }: NavbarProps) {
    return (
        <Navbar maxWidth="full" className="border-b">
            <NavbarBrand>
                <Image src="/logo.svg" alt="TaskBot Logo" width={24} height={24} className="mr-2" />
                <p className="font-semibold text-inherit">TaskBot</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <Button isIconOnly variant="light" radius="full">
                    <Image src="/notification.svg" alt="Notification" width={16} height={16}/>
                </Button>
                <Avatar src={user.avatar} name={user.name} size="sm" className="cursor-pointer" />
                <p>{user.name}</p>
            </NavbarContent>
        </Navbar>
    )
}

