"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Lightbulb, Database, Shield, BarChart3, Network } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Opportunities", href: "/opportunities", icon: Lightbulb },
    { name: "Supply Registry", href: "/supply", icon: Database },
    { name: "Network Graph", href: "/network", icon: Network },
    { name: "Policies", href: "/policies", icon: Shield },
    { name: "Reports", href: "/reports", icon: BarChart3 },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <nav className="w-64 border-r border-border bg-white h-[calc(100vh-50px)] overflow-y-auto py-4">
            <div className="px-3 mb-2">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-4">Apps</h2>
            </div>
            <ul className="space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary border-l-4 border-primary rounded-l-none"
                                        : "text-foreground hover:bg-gray-100 hover:text-primary"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                {item.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
