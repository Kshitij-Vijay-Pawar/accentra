import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:" bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-0 hover:bg-slate-100 text-slate-500",
        primary: "border-2 bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
        primaryOutline:" hover:bg-sky-400/30 bg-white text-sky-500 hover:slate-900",
        secondary:" border-2 bg-green-500 text-primary-foreground border-green-600 border-b-4 active:border-b-0 hover:bg-green-500/90",
        secondaryOutline:" bg-white text-green-500 hover:slate-900",
        danger:"border-2 bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
        dangerOutline:"bg-white text-red-500 hover:slate-900",
        super:"border-2 bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        superOutline:"bg-white text-indigo-500 hover:slate-900",
        ghost:" border-2 bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100 border-slate-200 border-b-4 active:border-b-0",
        sidebar:"bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-200 transition-none",
        sidebarOutline:"bg-sky-500/15 text-sky-500 border-2 border-sky-300 border-2 hover:bg-sky-500/20 transition-none",
        locked:"bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
      },
      size: {
        default: "h-11 px-4 py-2 ",
        sm: "h-9 px-3 ",
        lg: "h-12 px-8 ",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp 
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} // Spread the remaining props
    />
  )
}

export { Button, buttonVariants }
