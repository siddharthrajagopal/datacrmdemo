"use client"

import { PageHeader } from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { store } from "@/lib/store"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line, Legend } from 'recharts'
import { TrendingUp, Users, Database, Zap } from "lucide-react"

export default function DashboardPage() {
    const opportunities = store.getOpportunities() || []
    const supplyAssets = store.getSupplyAssets() || []

    // Business Unit Demand Analysis
    const buDemand = opportunities.reduce((acc, opp) => {
        acc[opp.businessUnit] = (acc[opp.businessUnit] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const buData = Object.entries(buDemand).map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)

    // Supply Asset Type Distribution
    const assetTypeDistribution = supplyAssets.reduce((acc, asset) => {
        acc[asset.type] = (acc[asset.type] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const assetData = Object.entries(assetTypeDistribution).map(([name, value], index) => ({
        name,
        value,
        color: ['#0070d2', '#dd7a01', '#c23934', '#4bca81', '#706e6b'][index % 5]
    }))

    // Adoption Trend (mock data - in real app would be from time-series data)
    const adoptionTrend = [
        { month: 'Jan', opportunities: 3, assets: 8 },
        { month: 'Feb', opportunities: 5, assets: 12 },
        { month: 'Mar', opportunities: 8, assets: 15 },
        { month: 'Apr', opportunities: 12, assets: 18 },
        { month: 'May', opportunities: 15, assets: 22 },
        { month: 'Jun', opportunities: opportunities.length, assets: supplyAssets.length },
    ]

    // Use Case Tracking (mock - would come from actual use case field)
    const useCases = [
        { name: 'Customer Analytics', count: 8, color: '#0070d2' },
        { name: 'Risk Management', count: 6, color: '#dd7a01' },
        { name: 'Supply Chain', count: 5, color: '#4bca81' },
        { name: 'Marketing', count: 4, color: '#c23934' },
        { name: 'Finance', count: 3, color: '#706e6b' },
    ]

    // Top Contributors
    const topContributors = opportunities.reduce((acc, opp) => {
        acc[opp.owner] = (acc[opp.owner] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const topContributorsList = Object.entries(topContributors)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

    return (
        <div>
            <PageHeader title="Adoption Dashboard" subtitle="Track platform usage and demand trends" />

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Business Units</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Object.keys(buDemand).length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Creating demand</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Demand Items</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-700">{opportunities.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Opportunities created</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Supply Assets</CardTitle>
                        <Database className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">{supplyAssets.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Available assets</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Adoption Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-700">85%</div>
                        <p className="text-xs text-green-600 mt-1">+12% this month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Demand by Business Unit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={buData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="value" fill="#0070d2" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Supply Asset Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={assetData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {assetData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Adoption Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={adoptionTrend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="opportunities" stroke="#0070d2" strokeWidth={2} name="Opportunities" />
                                    <Line type="monotone" dataKey="assets" stroke="#4bca81" strokeWidth={2} name="Supply Assets" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Use Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {useCases.map((useCase, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-8 rounded" style={{ backgroundColor: useCase.color }}></div>
                                        <span className="text-sm font-medium">{useCase.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">{useCase.count} opportunities</span>
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${(useCase.count / useCases[0].count) * 100}%`,
                                                    backgroundColor: useCase.color
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t">
                            <h4 className="text-sm font-semibold mb-3">Top Contributors</h4>
                            <div className="space-y-2">
                                {topContributorsList.map((contributor, index) => (
                                    <div key={index} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-muted-foreground w-4">#{index + 1}</span>
                                            <span>{contributor.name}</span>
                                        </div>
                                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                                            {contributor.count} items
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
