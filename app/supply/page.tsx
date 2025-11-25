"use client"

import { useState } from "react"
import { Filter, Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/Button"
import { DataTable } from "@/components/ui/DataTable"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import { store } from "@/lib/store"
import { SupplyAsset } from "@/lib/types"

export default function SupplyPage() {
    const [assets, setAssets] = useState<SupplyAsset[]>(store.getSupplyAssets())
    const [search, setSearch] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newAsset, setNewAsset] = useState<Partial<SupplyAsset>>({
        name: "",
        type: "Business Term",
        description: ""
    })

    const filteredData = assets.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.type.toLowerCase().includes(search.toLowerCase())
    )

    const handleCreate = () => {
        if (!newAsset.name) return

        const asset: SupplyAsset = {
            id: `asset-${Date.now()}`,
            name: newAsset.name!,
            type: (newAsset.type as any) || "Business Term",
            description: newAsset.description || ""
        }

        store.addSupplyAsset(asset)
        setAssets(store.getSupplyAssets())
        setIsModalOpen(false)
        setNewAsset({ name: "", type: "Business Term", description: "" })
    }

    const columns = [
        {
            header: "Name", accessorKey: "name" as keyof SupplyAsset, cell: (item: SupplyAsset) => (
                <span className="font-medium text-primary hover:underline cursor-pointer">{item.name}</span>
            )
        },
        {
            header: "Type", accessorKey: "type" as keyof SupplyAsset, cell: (item: SupplyAsset) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'Policy' ? 'bg-red-100 text-red-800' :
                        item.type === 'Business Term' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                    }`}>
                    {item.type}
                </span>
            )
        },
        { header: "Description", accessorKey: "description" as keyof SupplyAsset },
    ]

    return (
        <div>
            <PageHeader
                title="Supply Registry"
                subtitle="Manage Data Assets, Policies & Terms"
                actions={
                    <>
                        <Button variant="neutral" size="sm"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                        <Button variant="brand" size="sm" onClick={() => setIsModalOpen(true)}><Plus className="h-4 w-4 mr-2" /> New Asset</Button>
                    </>
                }
            />

            <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
                <div className="mb-4 max-w-sm">
                    <Input
                        placeholder="Search assets..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <DataTable data={filteredData} columns={columns} />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="New Asset"
                footer={
                    <>
                        <Button variant="neutral" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button variant="brand" onClick={handleCreate}>Save</Button>
                    </>
                }
            >
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Name</label>
                        <Input className="col-span-3" value={newAsset.name} onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Type</label>
                        <select
                            className="col-span-3 flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={newAsset.type}
                            onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value as any })}
                        >
                            <option value="Business Term">Business Term</option>
                            <option value="Policy">Policy</option>
                            <option value="Technical App">Technical App</option>
                            <option value="Dataset">Dataset</option>
                            <option value="Metric">Metric</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Description</label>
                        <Input className="col-span-3" value={newAsset.description} onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
