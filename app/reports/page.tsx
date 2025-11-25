"use client"

import { PageHeader } from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Download, TrendingUp, DollarSign, Target, Activity } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const opportunityData = [
    { name: "Jan", planned: 2, active: 3, delivered: 1 },
    { name: "Feb", planned: 3, active: 4, delivered: 2 },
    { name: "Mar", planned: 1, active: 5, delivered: 3 },
    { name: "Apr", planned: 4, active: 3, delivered: 4 },
    { name: "May", planned: 2, active: 6, delivered: 2 },
    { name: "Jun", planned: 3, active: 4, delivered: 5 },
]

const valueData = [
    { month: "Jan", estimated: 450000, realized: 150000 },
    { month: "Feb", estimated: 850000, realized: 300000 },
    { month: "Mar", estimated: 950000, realized: 600000 },
    { month: "Apr", estimated: 1200000, realized: 800000 },
    { month: "May", estimated: 950000, realized: 950000 },
    { month: "Jun", estimated: 1100000, realized: 1100000 },
]

const businessUnitData = [
    { name: "Marketing", value: 35, color: "#0070d2" },
    { name: "Sales", value: 30, color: "#dd7a01" },
    { name: "Operations", value: 25, color: "#c23934" },
    { name: "Finance", value: 10, color: "#4bca81" },
]

export default function ReportsPage() {
    return (
        <div>
            <PageHeader
                title="Reports & Analytics"
                subtitle="Track performance and business value"
                actions={
                    <>
                        <Button variant="neutral" size="sm"><Download className="h-4 w-4 mr-2" /> Export PDF</Button>
                        <Button variant="brand" size="sm"><Download className="h-4 w-4 mr-2" /> Export Excel</Button>
                    </>
                }
            />

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Value (TAM)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$950K</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-600">+12.5%</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Realized Value</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">$300K</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-600">+8.2%</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Opportunities</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Across 4 business units
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Time to Deliver</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78 days</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-red-600">+5 days</span> from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Opportunity Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={opportunityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="planned" fill="#0070d2" name="Planned" />
                                <Bar dataKey="active" fill="#4bca81" name="Active" />
                                <Bar dataKey="delivered" fill="#dd7a01" name="Delivered" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Value Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={valueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                                <Legend />
                                <Line type="monotone" dataKey="estimated" stroke="#0070d2" strokeWidth={2} name="Estimated Value" />
                                <Line type="monotone" dataKey="realized" stroke="#4bca81" strokeWidth={2} name="Realized Value" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Opportunities by Business Unit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                                <p className="text-sm font-medium text-blue-900">Top Performer</p>
                                <p className="text-xs text-blue-700 mt-1">Sales team delivered 40% of total value this quarter</p>
                            </div>
                            <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                                <p className="text-sm font-medium text-green-900">On Track</p>
                                <p className="text-xs text-green-700 mt-1">85% of active opportunities are meeting target dates</p>
                            </div>
                            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                                <p className="text-sm font-medium text-yellow-900">Needs Attention</p>
                                <p className="text-xs text-yellow-700 mt-1">3 opportunities are at risk due to data quality issues</p>
                            </div>
                            <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                                <p className="text-sm font-medium text-purple-900">Recommendation</p>
                                <p className="text-xs text-purple-700 mt-1">Consider increasing resources for Marketing initiatives</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div >
        </div >
    )
}
