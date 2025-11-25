"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/layout/PageHeader"
import { NetworkGraph } from "@/components/NetworkGraph"
import { store } from "@/lib/store"
import { Node, Edge, MarkerType } from "reactflow"

export default function NetworkPage() {
    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])

    useEffect(() => {
        // Load all data to build the full graph
        const opportunities = store.getOpportunities() || []
        const assets = store.getSupplyAssets() || []
        const allLinks = store.getAllLinks() || []

        const graphNodes: Node[] = []
        const graphEdges: Edge[] = []

        // Add Opportunity Nodes
        opportunities.forEach((opp, index) => {
            graphNodes.push({
                id: opp.id,
                type: 'input', // or default
                data: { label: opp.title },
                position: { x: 250 * (index % 3), y: 100 * Math.floor(index / 3) },
                style: { background: '#0070d2', color: 'white', border: 'none', width: 180 },
            })
        })

        // Add Asset Nodes
        assets.forEach((asset, index) => {
            graphNodes.push({
                id: asset.id,
                data: { label: asset.name },
                position: { x: 250 * (index % 3), y: 400 + (100 * Math.floor(index / 3)) },
                style: {
                    background: asset.type === 'Policy' ? '#c23934' :
                        asset.type === 'Business Term' ? '#dd7a01' :
                            '#fff',
                    color: asset.type === 'Policy' || asset.type === 'Business Term' ? 'white' : 'black',
                    border: '1px solid #dddbda'
                },
            })
        })

        // Add Edges
        // We need to access all links. I'll assume I can access store.links or I'll add a getter.
        // For now, I'll iterate opportunities and get links for each.
        opportunities.forEach(opp => {
            const links = store.getLinks(opp.id)
            links.forEach(link => {
                graphEdges.push({
                    id: `${link.sourceId}-${link.targetId}`,
                    source: link.sourceId,
                    target: link.targetId,
                    label: link.type,
                    type: 'smoothstep',
                    markerEnd: { type: MarkerType.ArrowClosed },
                    animated: true,
                })
            })
        })

        setNodes(graphNodes)
        setEdges(graphEdges)
    }, [])

    return (
        <div>
            <PageHeader title="Network Graph" subtitle="Demand & Supply Relationships" />
            <div className="h-[600px] w-full border border-border rounded-lg bg-gray-50">
                <NetworkGraph nodes={nodes} edges={edges} />
            </div>
        </div>
    )
}
