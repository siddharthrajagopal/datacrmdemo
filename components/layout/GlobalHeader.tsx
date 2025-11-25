import Link from "next/link"
import { Search, Bell, Settings, HelpCircle, Grid } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function GlobalHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm h-[50px] flex items-center px-4">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                    <Grid className="h-6 w-6 text-muted-foreground" />
                </Button>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                        <span className="text-primary font-bold text-xl">☁️</span>
                    </div>
                    <span className="font-semibold text-lg tracking-tight">DataCRM</span>
                </div>
            </div>

            <div className="flex-1 mx-8">
                <div className="relative max-w-md">
                    <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                </Button>
                <div className="ml-2 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <span className="text-xs font-medium text-primary">US</span>
                </div>
            </div>
        </header>
    )
}
