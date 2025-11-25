import { Button } from "@/components/ui/Button"

interface PageHeaderProps {
    title: string
    subtitle?: string
    icon?: React.ReactNode
    actions?: React.ReactNode
}

export function PageHeader({ title, subtitle, icon, actions }: PageHeaderProps) {
    return (
        <div className="bg-white border-b border-border p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {icon && (
                        <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center text-primary">
                            {icon}
                        </div>
                    )}
                    <div>
                        {subtitle && <p className="text-xs text-muted-foreground uppercase tracking-wide">{subtitle}</p>}
                        <h1 className="text-xl font-bold text-foreground">{title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {actions}
                </div>
            </div>
        </div>
    )
}
