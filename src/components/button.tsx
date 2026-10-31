import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "Primary" | "Secondary" | "Destructive";

type val = {
    variant?:Variant 
} & ComponentProps<"button">

export default function Button({variant="Primary",className,...props} : val){
    return(
        <button {...props} className={twMerge(
            "transition-colors px-2 py-1 rounded disabled:opacity-30 disabled:cursor-not-allowed",
            getVariantStyles(variant), 
            className)}/>
    )
}

function getVariantStyles(variant: Variant){
    switch(variant){
        case "Primary":
            return "bg-violet-600 hover:bg-violet-500";
        case "Secondary":
            return " bg-zinc-700 hover:bg-zinc-500";
        case "Destructive":
            return " hover:bg-red-800 text-red-800 hover:text-red-200";
        default:
            throw new Error(`Invalid Variant: ${variant satisfies never}`)
    }
}