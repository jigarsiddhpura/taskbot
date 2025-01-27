"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from "@heroui/react"
import { Filter, Plus } from "lucide-react"
import type { TableColumn as CustomTableColumn, TableRow as CustomTableRow } from "@/types/table"
import Image from "next/image"
import { useState } from "react"


// interface CustomTableProps {
//     columns: CustomTableColumn[]
//     rows: CustomTableRow[]
//     selectedKeys: Set<string>
//     onSelectionChange: (keys: Set<string>) => void
//     onCellChange: (rowId: string, columnKey: string, value: string) => void
//     onAddColumn: () => void
//     onAddRow: () => void
// }

export function CustomTable(props: any) {
    const {
        columns,
        rows,
        selectedKeys,
        onSelectionChange,
        onCellChange,
        onAddColumn,
        onAddRow,
        onColumnNameUpdate
    } = props

    const [editingHeader, setEditingHeader] = useState<string | null>(null);
    const [editingCell, setEditingCell] = useState<{ rowId: string, columnId: string } | null>(null);

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
                onRowAction={(key) => console.log("row action", key)}
            >
                <TableHeader>
                    {columns?.map(column => (
                        <TableColumn key={column.id}>
                            {editingHeader === column.id ? (
                                <Input
                                    size="sm"
                                    defaultValue={column.label}
                                    variant="underlined"
                                    autoFocus
                                    // className="bg-transparent"
                                    // classNames={{
                                    //     input: "bg-transparent shadow-none font-semibold",
                                    //     inputWrapper: "shadow-none bg-transparent"
                                    // }}
                                    onBlur={(e) => {
                                        setEditingHeader(null);
                                        onColumnNameUpdate(column.id, e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setEditingHeader(null);
                                            onColumnNameUpdate(column.id, e.currentTarget.value);
                                        }
                                        if (e.key === 'Escape') {
                                            setEditingHeader(null);
                                        }
                                    }}
                                />
                            ) : (
                                <div
                                    className="cursor-pointer font-semibold"
                                    onClick={() => setEditingHeader(column.id)}
                                >
                                    {column.label}
                                </div>
                            )}
                        </TableColumn>
                    ))}
                    <TableColumn>
                        <Button
                            size="sm"
                            variant="light"
                            startContent={<Plus className="h-4 w-4" />}
                            onPress={onAddColumn}
                        >
                            Add Column
                        </Button>
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {rows?.map((row: CustomTableRow) => (
                        <TableRow key={row.id}>
                            {columns.map((column: CustomTableColumn) => (
                                <TableCell key={`${row.id}-${column.id}`}
                                    onClick={() => setEditingCell({ rowId: row.id, columnId: column.id })}
                                >
                                    {editingCell?.rowId === row.id && editingCell?.columnId === column.id ? (
                                        <Input
                                            size="sm"
                                            variant="underlined"
                                            value={row[column.key]}
                                            onChange={e => onCellChange(row.id, column.key, e.target.value)}
                                            autoFocus // user can immediately start typing when cell becomes editable
                                            onBlur={() => setEditingCell(null)} // exit edit mode when clicked away
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    setEditingCell(null);
                                                }
                                                if (e.key === 'Escape') {
                                                    setEditingCell(null);
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="px-2 py-1 cursor-pointer">
                                            {row[column.key]}
                                        </div>
                                    )}
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

