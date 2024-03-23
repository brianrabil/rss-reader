import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Page({
	children,
	bg = "background",
	flex = "col",
	className,
}: {
	readonly children: ReactNode;
	readonly bg?: "background" | "foreground";
	readonly flex?: "row" | "col";
	readonly className?: string;
}) {
	return (
		<div
			className={cn(
				`flex flex-${flex} min-h-screen max-h-screen w-full h-full bg-${bg}`,
				className
			)}
		>
			{children}
		</div>
	);
}
