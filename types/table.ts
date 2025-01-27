export interface TableColumn {
    id: string
    key: string
    label: string
}

export interface TableRow {
    id: string
    [key: string]: string
}

export interface TableState {
    columns: TableColumn[]
    rows: TableRow[]
    selectedKeys: Set<string>
}

