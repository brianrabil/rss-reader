import * as React from "react";
import { cn, useResponsiveClass, type ResponsiveProp } from "@/lib/utils";

interface StackProps {
	readonly children?: React.ReactNode;
	readonly className?: string;
	readonly direction?: ResponsiveProp<"row" | "col">;
	readonly gap?: ResponsiveProp<number>;
	readonly gapX?: ResponsiveProp<number>;
	readonly gapY?: ResponsiveProp<number>;
	readonly justify?: ResponsiveProp<"start" | "end" | "center" | "between" | "around" | "evenly">;
	readonly align?: ResponsiveProp<"start" | "end" | "center" | "baseline" | "stretch">;
}

/**
 * Stack component
 */
export function Stack({
	children,
	className,
	direction: $direction = "row",
	gap: $gap = 1.5,
	gapX: $gapX,
	gapY: $gapY,
	justify: $justify = "center",
	align: $align = "center",
}: StackProps) {
	const gap = useResponsiveClass("gap", $gap);
	const gapX = useResponsiveClass("gap-x", $gapX);
	const gapY = useResponsiveClass("gap-y", $gapY);
	const direction = useResponsiveClass("flex", $direction);
	const justify = useResponsiveClass("justify", $justify);
	const align = useResponsiveClass("items", $align);
	return (
		<div className={cn("flex", gap, gapX, gapY, direction, justify, align, className)}>
			{children}
		</div>
	);
}
