"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from "@heroui/react"
import { Filter, Plus } from "lucide-react"
import type { TableColumn as CustomTableColumn, TableRow as CustomTableRow } from "../../../types/table"
import Image from "next/image"

interface CustomTableProps {
    columns: CustomTableColumn[]
    rows: CustomTableRow[]
    selectedKeys: Set<string>
    onSelectionChange: (keys: Set<string>) => void
    onCellChange: (rowId: string, columnKey: string, value: string) => void
    onAddColumn: () => void
    onAddRow: () => void
}

export function CustomTable({
    columns,
    rows,
    selectedKeys,
    onSelectionChange,
    onCellChange,
    onAddColumn,
    onAddRow,
}: CustomTableProps) {
    return (
        <div className="space-y-4 px-20">
            <div className="flex items-center gap-4">
                <Input
                    className="max-w-xs"
                    placeholder="Search..."
                    size="sm"
                    startContent={<Image src="/search.svg" alt="Search" width={16} height={16} />}
                />
                <Button variant="flat" size="sm" startContent={<Filter className="h-4 w-4" />}>
                    Filter
                </Button>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="flat" size="sm" startContent={<Image src="/upload.svg" alt="Upload" width={16} height={16} />}>
                        Upload File
                    </Button>
                    <Button variant="flat" size="sm">
                        Prompt Settings
                    </Button>
                    <Button className="bg-black text-white" size="sm">
                        Save Data
                    </Button>
                </div>
            </div>
            <Table
                aria-label="Custom table"
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => onSelectionChange(keys as Set<string>)}
                onRowAction={(key) => null}
            >
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.id}>{column.label}</TableColumn>
                    ))}
                    <TableColumn>
                        <Button size="sm" variant="light" startContent={<Plus className="h-4 w-4" />} onPress={onAddColumn}>
                            Add Column
                        </Button>
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            {columns.map((column) => (
                                <TableCell key={`${row.id}-${column.id}`}>
                                    <Input
                                        isReadOnly
                                        size="sm"
                                        value={row[column.key]}
                                        onChange={(e) => onCellChange(row.id, column.key, e.target.value)}
                                    />
                                </TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                size="sm"
                variant="light"
                startContent={<Plus className="h-4 w-4" />}
                onPress={onAddRow}
                className="w-full flex items-center justify-start bg-white shadow-lg rounded-md p-5"
            >
                Add Row
            </Button>


        </div>
    )
}

