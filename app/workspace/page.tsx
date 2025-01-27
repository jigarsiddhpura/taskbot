"use client"

import { WorkspaceHeader } from "./components/workspace-header"
import { CustomTable } from "./components/custom-table"
import { useTableState } from "./hooks/useTableState"

export default function WorkspacePage() {
    const {
        state: { columns, rows, selectedKeys },
        addColumn,
        addRow,
        updateSelection,
        updateCell,
    } = useTableState()

    return (
        <div className="min-h-screen flex flex-col">
            <WorkspaceHeader />
            <main className="flex-1 bg-gray-50 p-4">
                <div className="container mx-auto">
                    <CustomTable
                        columns={columns}
                        rows={rows}
                        selectedKeys={selectedKeys}
                        onSelectionChange={updateSelection}
                        onCellChange={updateCell}
                        onAddColumn={addColumn}
                        onAddRow={addRow}
                    />
                </div>
            </main>
        </div>
    )
}

