import { useState, useCallback } from "react"
import type { TableColumn, TableRow, TableState } from "@/types/table"

const defaultColumns: TableColumn[] = [
    { id: "1", key: "fullName", label: "Full Name" },
    { id: "2", key: "email", label: "Email" },
    { id: "3", key: "companyDomain", label: "Company Domain" },
    { id: "4", key: "linkedinProfile", label: "LinkedIn Profile" },
]

const defaultRows: TableRow[] = [
    {
        id: "1",
        fullName: "Peter Smith",
        email: "peter123@gmail.com",
        companyDomain: "www.peter123.com",
        linkedinProfile: "www.linkedin.com/Peter123",
    },
    {
        id: "2",
        fullName: "Daryn Johnson",
        email: "daryn22@outlook.com",
        companyDomain: "www.apple.com",
        linkedinProfile: "www.linkedin.com/DarynJ",
    },
]

export function useTableState() {
    const [state, setState] = useState<TableState>({
        columns: defaultColumns,
        rows: defaultRows,
        selectedKeys: new Set(),
    })

    const addColumn = useCallback(() => {
        const newColumnId = (state.columns.length + 1).toString()
        const newColumn: TableColumn = {
            id: newColumnId,
            key: `column${newColumnId}`,
            label: `New Column ${newColumnId}`,
        }

        setState((prev) => ({
            ...prev,
            columns: [...prev.columns, newColumn],
            rows: prev.rows.map((row) => ({
                ...row,
                [newColumn.key]: "",
            })),
        }))
    }, [state.columns])

    const addRow = useCallback(() => {
        const newRowId = (state.rows.length + 1).toString()
        const newRow: TableRow = {
            id: newRowId,
            ...Object.fromEntries(state.columns.map((col) => [col.key, ""])),
        }

        setState((prev) => ({
            ...prev,
            rows: [...prev.rows, newRow],
        }))
    }, [state.columns, state.rows])

    const updateSelection = useCallback((keys: Set<string>) => {
        setState((prev) => ({
            ...prev,
            selectedKeys: keys,
        }))
    }, [])

    const updateCell = useCallback((rowId: string, columnKey: string, value: string) => {
        setState((prev) => ({
            ...prev,
            rows: prev.rows.map((row) => (row.id === rowId ? { ...row, [columnKey]: value } : row)),
        }))
    }, [])

    const updateColumnLabel = useCallback((columnId: string, newLabel: string) => {
        setState((prev) => ({
            ...prev,
            columns: prev.columns.map((col) => 
                col.id === columnId ? { ...col, label: newLabel } : col
            ),
        }))
    }, [])

    return {
        state,
        addColumn,
        addRow,
        updateSelection,
        updateCell,
        updateColumnLabel
    }
}

