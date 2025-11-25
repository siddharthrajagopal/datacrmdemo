"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, Save, Share2, Plus } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Modal } from "@/components/ui/Modal"
import { NetworkGraph } from "@/components/NetworkGraph"
import { store } from "@/lib/store"
import { Opportunity, Link as LinkType, SupplyAsset } from "@/lib/types"
import { Node, Edge, MarkerType } from "reactflow"

export default function OpportunityDetailPage() {
    const params = useParams()
    const id = params?.id as string
    const [opportunity, setOpportunity] = useState<Opportunity | undefined>(undefined)
    const [links, setLinks] = useState<LinkType[]>([])
    const [supplyAssets, setSupplyAssets] = useState<SupplyAsset[]>([])
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
    const [selectedAssetId, setSelectedAssetId] = useState("")
    const [linkType, setLinkType] = useState<LinkType['type']>('relates_to')

    useEffect(() => {
        if (id) {
            const opp = store.getOpportunity(id)
            setOpportunity(opp)
            const oppLinks = store.getLinks(id)
            setLinks(oppLinks)
            setSupplyAssets(store.getSupplyAssets())
        }
    }, [id])

    if (!opportunity) {
        return <div className="p-6">Loading...</div>
    }

    // Prepare Graph Data
    const nodes: Node[] = [
        {
            id: opportunity.id,
            type: 'input',
            data: { label: opportunity.title },
            position: { x: 250, y: 0 },
            style: { background: '#0070d2', color: 'white', border: 'none', width: 180 },
        },
        ...links.map((link, index) => {
            const asset = supplyAssets.find(a => a.id === link.targetId)
            return {
                id: link.targetId,
                data: { label: asset?.name || link.targetId },
                position: { x: 100 + (index * 150), y: 200 },
                style: {
                    background: asset?.type === 'Policy' ? '#c23934' :
                        asset?.type === 'Business Term' ? '#dd7a01' :
                            '#fff',
                    color: asset?.type === 'Policy' || asset?.type === 'Business Term' ? 'white' : 'black',
                    border: '1px solid #dddbda'
                },
            }
        })
    ]

    const edges: Edge[] = links.map(link => ({
        id: `${link.sourceId}-${link.targetId}`,
        source: link.sourceId,
        target: link.targetId,
        label: link.type,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
        animated: true,
    }))

    const handleAddLink = () => {
        if (!selectedAssetId) return

        const newLink: LinkType = {
            sourceId: opportunity.id,
            targetId: selectedAssetId,
            type: linkType
        }

        store.addLink(newLink)
        setLinks(store.getLinks(opportunity.id))
        setIsLinkModalOpen(false)
        setSelectedAssetId("")
    }

    const availableAssets = supplyAssets.filter(asset => !links.some(link => link.targetId === asset.id))

    return (
        <div>
            <div className="mb-4">
                <Link href="/opportunities" className="text-sm text-primary hover:underline flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Back to Opportunities
                </Link>
            </div>

            <PageHeader
                title={opportunity.title}
                subtitle={`Opportunity • ${opportunity.id}`}
                actions={
                    <>
                        <Button variant="neutral" size="sm">Edit</Button>
                        <Button variant="neutral" size="sm"><Share2 className="h-4 w-4" /></Button>
                        <Button variant="brand" size="sm"><Save className="h-4 w-4 mr-2" /> Save</Button>
                    </>
                }
            />

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Status</label>
                                <div className="mt-1 text-sm">{opportunity.status}</div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Owner</label>
                                <div className="mt-1 text-sm text-primary">{opportunity.owner}</div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Business Unit</label>
                                <div className="mt-1 text-sm">{opportunity.businessUnit}</div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Target Date</label>
                                <div className="mt-1 text-sm">{opportunity.targetDate}</div>
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs font-medium text-muted-foreground">Description</label>
                                <div className="mt-1 text-sm">{opportunity.description}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Business Value Modeling</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">Estimated Value</label>
                                    <div className="mt-1 text-2xl font-bold text-green-700">${opportunity.estimatedValue.toLocaleString()}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Network Graph (Demand ↔ Supply)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <NetworkGraph nodes={nodes} edges={edges} />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Linked Assets</CardTitle>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsLinkModalOpen(true)}><Plus className="h-4 w-4" /></Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {links.map(link => {
                                    const asset = supplyAssets.find(a => a.id === link.targetId)
                                    return (
                                        <div key={link.targetId} className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 border border-transparent hover:border-border transition-colors">
                                            <div className={`mt-0.5 h-2 w-2 rounded-full ${asset?.type === 'Policy' ? 'bg-red-500' :
                                                    asset?.type === 'Business Term' ? 'bg-orange-500' :
                                                        'bg-blue-500'
                                                }`} />
                                            <div>
                                                <div className="text-sm font-medium text-primary hover:underline cursor-pointer">{asset?.name}</div>
                                                <div className="text-xs text-muted-foreground">{asset?.type} • {link.type}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Modal
                isOpen={isLinkModalOpen}
                onClose={() => setIsLinkModalOpen(false)}
                title="Link Supply Asset"
                footer={
                    <>
                        <Button variant="neutral" onClick={() => setIsLinkModalOpen(false)}>Cancel</Button>
                        <Button variant="brand" onClick={handleAddLink} disabled={!selectedAssetId}>Link Asset</Button>
                    </>
                }
            >
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Asset</label>
                        <select
                            className="col-span-3 flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={selectedAssetId}
                            onChange={(e) => setSelectedAssetId(e.target.value)}
                        >
                            <option value="" disabled>Select an asset...</option>
                            {availableAssets.map(asset => (
                                <option key={asset.id} value={asset.id}>{asset.name} ({asset.type})</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium">Relationship</label>
                        <select
                            className="col-span-3 flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={linkType}
                            onChange={(e) => setLinkType(e.target.value as LinkType['type'])}
                        >
                            <option value="relates_to">Relates To</option>
                            <option value="governed_by">Governed By</option>
                            <option value="uses_data_from">Uses Data From</option>
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
