"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { DataTable } from "@/components/ui/DataTable"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import { Filter, Plus, AlertTriangle, CheckCircle2 } from "lucide-react"

interface Policy {
    id: string
    name: string
    type: string
    description: string
    status: "Active" | "Draft" | "Deprecated"
    lastUpdated: string
    owner: string
}

const mockPolicies: Policy[] = [
    {
        id: "pol-001",
        name: "GDPR Compliance",
        type: "Data Privacy",
        description: "General Data Protection Regulation requirements for EU citizens",
        status: "Active",
        lastUpdated: "2024-01-15",
        owner: "Legal Team"
    },
    {
        id: "pol-002",
        name: "Data Retention Policy",
        type: "Data Management",
        description: "Data must be retained for 5 years per regulatory requirements",
        status: "Active",
        lastUpdated: "2023-12-10",
        owner: "Compliance Team"
    },
    {
        id: "pol-003",
        name: "PII Protection",
        type: "Data Security",
        description: "Personally Identifiable Information handling guidelines",
        status: "Active",
        lastUpdated: "2024-02-01",
        owner: "Security Team"
    },
    {
        id: "pol-004",
        name: "Data Quality Standards",
        type: "Data Quality",
        description: "Minimum standards for data accuracy and completeness",
        status: "Draft",
        lastUpdated: "2024-03-05",
        owner: "Data Team"
    },
]

export default function PoliciesPage() {
    const [policies, setPolicies] = useState<Policy[]>(mockPolicies)
    const [search, setSearch] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newPolicy, setNewPolicy] = useState<Partial<Policy>>({
        name: "",
        type: "",
        description: "",
        status: "Draft",
        owner: ""
    })

    const filteredData = policies.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase())
    )

    const handleCreate = () => {
        if (!newPolicy.name) return

        const policy: Policy = {
            id: `pol-${Date.now()}`,
            name: newPolicy.name!,
            type: newPolicy.type || "General",
            description: newPolicy.description || "",
            status: (newPolicy.status as any) || "Draft",
            lastUpdated: new Date().toISOString().split('T')[0],
            owner: newPolicy.owner || "Unassigned"
        }

        setPolicies([...policies, policy])
        setIsModalOpen(false)
        setNewPolicy({ name: "", type: "", description: "", status: "Draft", owner: "" })
    }

    const columns = [
        {
            header: "Policy Name",
            accessorKey: "name" as keyof Policy,
            cell: (item: Policy) => (
                <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-primary hover:underline cursor-pointer">{item.name}</span>
                </div>
            )
        },
        { header: "Type", accessorKey: "type" as keyof Policy },
        {
            header: "Status",
            accessorKey: "status" as keyof Policy,
            cell: (item: Policy) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' :
                        item.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {item.status}
                </span>
            )
        },
        { header: "Owner", accessorKey: "owner" as keyof Policy },
        { header: "Last Updated", accessorKey: "lastUpdated" as keyof Policy },
    ]

    const activeCount = policies.filter(p => p.status === "Active").length
    const draftCount = policies.filter(p => p.status === "Draft").length

    return (
        <div>
            <PageHeader
                title="Policies & Compliance"
                subtitle="Manage data governance policies"
                actions={
                    <>
                        <Button variant="neutral" size="sm"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                        <Button variant="brand" size="sm" onClick={() => setIsModalOpen(true)}><Plus className="h-4 w-4 mr-2" /> New Policy</Button>
                    </>
                }
            />

            <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Policies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{policies.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Policies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">{activeCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Draft Policies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-700">{draftCount}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
                <div className="mb-4 max-w-sm">
                    <Input
                        placeholder="Search policies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <DataTable data={filteredData} columns={columns} />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="New Policy"
                footer={
                    <>
                        <Button variant="neutral" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button variant="brand" onClick={handleCreate}>Save</Button>
                    </>
                }
            >
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Policy Name</label>
                        <Input className="col-span-3" value={newPolicy.name} onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Type</label>
                        <Input className="col-span-3" value={newPolicy.type} onChange={(e) => setNewPolicy({ ...newPolicy, type: e.target.value })} placeholder="e.g., Data Privacy, Security" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Owner</label>
                        <Input className="col-span-3" value={newPolicy.owner} onChange={(e) => setNewPolicy({ ...newPolicy, owner: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Description</label>
                        <Input className="col-span-3" value={newPolicy.description} onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
