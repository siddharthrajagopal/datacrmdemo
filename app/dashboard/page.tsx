"use client"

import { PageHeader } from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { store } from "@/lib/store"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function DashboardPage() {
    const metrics = store.getMetrics()
    const opportunities = store.getOpportunities()

    // Prepare chart data
    const dataByStatus = [
        { name: 'Planned', value: opportunities.filter(o => o.status === 'Planned').length, color: '#0070d2' },
        { name: 'Active', value: opportunities.filter(o => o.status === 'Active').length, color: '#027e46' },
        { name: 'Delivered', value: opportunities.filter(o => o.status === 'Delivered').length, color: '#706e6b' },
        { name: 'Blocked', value: opportunities.filter(o => o.status === 'Blocked').length, color: '#c23934' },
    ]

    return (
        <div>
            <PageHeader title="Dashboard" subtitle="Overview" />

            <div className="grid grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Addressable Market (TAM)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${metrics.totalTAM.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total estimated value of all opportunities</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Realized Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">${metrics.realizedValue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">Value from delivered opportunities</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.activeOpportunities}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Closed Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.closedOpportunities}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Opportunities by Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dataByStatus}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {dataByStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Placeholder for another chart */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Value Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-gray-50 rounded border border-dashed border-border">
                            Pipeline Chart Placeholder
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
