import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import {  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import Link from "next/link"
import Image from "next/image";

export function WorkspaceHeader() {
    return (
        <div className="border-b bg-white">
            <div className="container mx-auto px-24 py-4">
                <div className="flex items-center gap-4">
                    <Link href="/workspace" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Link>
                    <div className="text-sm text-gray-500">Workspace &gt; Custom Table</div>
                    <div className="ml-auto flex items-center gap-2">
                        <Image src="/credits-warning.svg" alt="Credits Warning" width={16} height={16} />
                        <span className="text-sm text-gray-500 mr-6">Out of Credits</span>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" endContent={<ChevronDown className="h-4 w-4" />}>
                                    Actions
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new">New file</DropdownItem>
                                <DropdownItem key="copy">Copy link</DropdownItem>
                                <DropdownItem key="edit">Edit file</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

