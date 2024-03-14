import * as React from "react";
import cn from "clsx";

export function Container({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("container mx-auto p-8 flex flex-col max-w-4xl", className)}>{children}</div>
	);
}
