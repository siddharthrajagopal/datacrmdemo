"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Filter, Download } from "lucide-react"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/Button"
import { DataTable } from "@/components/ui/DataTable"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import { store } from "@/lib/store"
import { Opportunity } from "@/lib/types"

export default function OpportunitiesPage() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>(store.getOpportunities())
    const [search, setSearch] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newOpp, setNewOpp] = useState<Partial<Opportunity>>({
        title: "",
        businessUnit: "",
        owner: "",
        estimatedValue: 0,
        status: "Planned",
        targetDate: "",
        description: ""
    })

    const filteredData = opportunities.filter(o =>
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.businessUnit.toLowerCase().includes(search.toLowerCase())
    )

    const handleCreate = () => {
        if (!newOpp.title || !newOpp.businessUnit) return // Simple validation

        const opp: Opportunity = {
            id: `opp-${Date.now()}`,
            title: newOpp.title!,
            businessUnit: newOpp.businessUnit!,
            owner: newOpp.owner || "Unassigned",
            estimatedValue: Number(newOpp.estimatedValue) || 0,
            status: (newOpp.status as any) || "Planned",
            createdAt: new Date().toISOString().split('T')[0],
            targetDate: newOpp.targetDate || "",
            description: newOpp.description || ""
        }

        store.addOpportunity(opp)
        setOpportunities([...store.getOpportunities()]) // Force refresh
        setIsModalOpen(false)
        setNewOpp({ title: "", businessUnit: "", owner: "", estimatedValue: 0, status: "Planned", targetDate: "", description: "" })
    }

    const columns = [
        {
            header: "Title", accessorKey: "title" as keyof Opportunity, cell: (item: Opportunity) => (
                <Link href={`/opportunities/${item.id}`} className="text-primary hover:underline font-medium">
                    {item.title}
                </Link>
            )
        },
        { header: "Business Unit", accessorKey: "businessUnit" as keyof Opportunity },
        { header: "Owner", accessorKey: "owner" as keyof Opportunity },
        {
            header: "Est. Value", accessorKey: "estimatedValue" as keyof Opportunity, cell: (item: Opportunity) => (
                <span>${item.estimatedValue.toLocaleString()}</span>
            )
        },
        {
            header: "Status", accessorKey: "status" as keyof Opportunity, cell: (item: Opportunity) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' :
                    item.status === 'Planned' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'Delivered' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {item.status}
                </span>
            )
        },
        { header: "Target Date", accessorKey: "targetDate" as keyof Opportunity },
    ]

    return (
        <div>
            <PageHeader
                title="Opportunities"
                subtitle="Manage Data Demand"
                actions={
                    <>
                        <Button variant="neutral" size="sm"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                        <Button variant="neutral" size="sm"><Download className="h-4 w-4 mr-2" /> Export</Button>
                        <Button variant="brand" size="sm" onClick={() => setIsModalOpen(true)}><Plus className="h-4 w-4 mr-2" /> New Opportunity</Button>
                    </>
                }
            />

            <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
                <div className="mb-4 max-w-sm">
                    <Input
                        placeholder="Search opportunities..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <DataTable data={filteredData} columns={columns} />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="New Opportunity"
                footer={
                    <>
                        <Button variant="neutral" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button variant="brand" onClick={handleCreate}>Save</Button>
                    </>
                }
            >
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Title</label>
                        <Input className="col-span-3" value={newOpp.title} onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Business Unit</label>
                        <Input className="col-span-3" value={newOpp.businessUnit} onChange={(e) => setNewOpp({ ...newOpp, businessUnit: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Owner</label>
                        <Input className="col-span-3" value={newOpp.owner} onChange={(e) => setNewOpp({ ...newOpp, owner: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Est. Value</label>
                        <Input type="number" className="col-span-3" value={newOpp.estimatedValue} onChange={(e) => setNewOpp({ ...newOpp, estimatedValue: Number(e.target.value) })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Target Date</label>
                        <Input type="date" className="col-span-3" value={newOpp.targetDate} onChange={(e) => setNewOpp({ ...newOpp, targetDate: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Description</label>
                        <Input className="col-span-3" value={newOpp.description} onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
