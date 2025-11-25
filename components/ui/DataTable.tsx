import * as React from "react"
import { cn } from "@/lib/utils"

interface DataTableProps<T> {
    data: T[]
    columns: {
        header: string
        accessorKey?: keyof T
        cell?: (item: T) => React.ReactNode
        className?: string
    }[]
    onRowClick?: (item: T) => void
}

export function DataTable<T>({ data, columns, onRowClick }: DataTableProps<T>) {
    return (
        <div className="rounded-md border border-border overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-border text-xs uppercase text-muted-foreground font-semibold">
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className={cn("px-4 py-3", col.className)}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                                No data found.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, rowIdx) => (
                            <tr
                                key={rowIdx}
                                className={cn(
                                    "hover:bg-gray-50 transition-colors",
                                    onRowClick && "cursor-pointer"
                                )}
                                onClick={() => onRowClick?.(item)}
                            >
                                {columns.map((col, colIdx) => (
                                    <td key={colIdx} className="px-4 py-3">
                                        {col.cell
                                            ? col.cell(item)
                                            : col.accessorKey
                                                ? (item[col.accessorKey] as React.ReactNode)
                                                : null}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
