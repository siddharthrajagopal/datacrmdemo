import * as React from "react"
import { cn } from "@/lib/utils"

// Since we don't have cva installed, I'll implement a simple version or just use clsx/tailwind directly.
// Actually, I didn't install class-variance-authority. I should have.
// I'll stick to simple props for now to avoid extra dependencies if I missed them, 
// or I can install it. It's standard. I'll install it quickly or just write the classes.
// I'll write the classes manually for now to save a step, or use a simple mapping.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "neutral" | "brand" | "destructive" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "neutral", size = "md", ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            neutral: "bg-white text-foreground border border-border hover:bg-gray-50",
            brand: "bg-primary text-primary-foreground hover:bg-blue-700 border border-transparent",
            destructive: "bg-destructive text-destructive-foreground hover:bg-red-700 border border-transparent",
            outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
        }

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-9 px-4 py-2",
            lg: "h-10 px-8",
        }

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
