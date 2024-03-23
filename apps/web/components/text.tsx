import * as React from "react";
import { cn, type ResponsiveProp, useResponsiveClass } from "@/lib/utils";

interface TextProps {
	/**
	 * HTML element or React component
	 * @default "span"
	 */
	readonly as?: React.ElementType;
	/**
	 * Additional class names
	 * @default ""
	 */
	readonly className?: string;
	/**
	 * Text content
	 * @default ""
	 */
	readonly children?: React.ReactNode;
	/**
	 * Text size
	 * @default "md"
	 */
	readonly size?: ResponsiveProp<
		"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
	>;
	/**
	 * Text weight
	 * @default "normal"
	 */
	readonly weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
	/**
	 * Text tracking
	 * @default "normal"
	 */
	readonly tracking?: "tight" | "normal" | "wide";
	/**
	 * Text italic
	 * @default false
	 */
	readonly italic?: boolean;
	/**
	 * Text color
	 * @default "foreground"
	 */
	readonly color?:
		| "primary"
		| "accent"
		| "muted"
		| "destructive"
		| "primary-foreground"
		| "accent-foreground"
		| "muted-foreground"
		| "destructive-foreground"
		| "foreground";
}

function TextBase({
	as: Tag = "span",
	children,
	className,
	color = "foreground",
	italic,
	size: $size = "md",
	tracking = "normal",
	weight = "normal",
	...restProps
}: TextProps) {
	const size = useResponsiveClass("text", $size);
	return (
		<Tag
			className={cn(
				size,
				`font-${weight}`,
				`tracking-${tracking}`,
				`text-${color}`,
				italic && "italic",
				className
			)}
			{...restProps}
		>
			{children}
		</Tag>
	);
}

export function H1({ ...props }: TextProps) {
	props.as ??= "h1";
	props.color ??= "foreground";
	props.italic ??= false;
	props.size ??= { base: "4xl", lg: "5xl" };
	props.tracking ??= "tight";
	props.weight ??= "extrabold";
	return <TextBase className="scroll-m-20" {...props} />;
}

export function H2({ ...props }: TextProps) {
	props.as ??= "h2";
	props.color ??= "foreground";
	props.italic ??= false;
	props.size ??= "3xl";
	props.tracking ??= "tight";
	props.weight ??= "semibold";
	return <TextBase className="scroll-m-20 border-b pb-2 first:mt-0" {...props} />;
}

export function H3({ ...props }: TextProps) {
	props.as ??= "h3";
	props.color ??= "foreground";
	props.italic ??= false;
	props.size ??= "2xl";
	props.tracking ??= "tight";
	props.weight ??= "semibold";
	return <TextBase className="scroll-m-20" {...props} />;
}

export function H4({ ...props }: TextProps) {
	props.as ??= "h4";
	props.color ??= "foreground";
	props.italic ??= false;
	props.size ??= "xl";
	props.tracking ??= "tight";
	props.weight ??= "semibold";
	return <TextBase className="scroll-m-20" {...props} />;
}

export function P({ ...props }: TextProps) {
	props.as ??= "p";
	props.color ??= "foreground";
	props.italic ??= false;
	props.size ??= "md";
	props.tracking ??= "normal";
	props.weight ??= "normal";
	return <TextBase className="leading-7 [&:not(:first-child)]:mt-6" {...props} />;
}

export function Blockquote({ ...props }: TextProps) {
	props.as ??= "blockquote";
	props.color ??= "foreground";
	props.italic ??= true;
	props.size ??= "md";
	props.tracking ??= "normal";
	props.weight ??= "normal";
	return <TextBase className="mt-6 border-l-2 pl-6" {...props} />;
}

export function Lead({ ...props }: TextProps) {
	props.as ??= "p";
	props.color ??= "muted-foreground";
	props.italic ??= false;
	props.size ??= "xl";
	props.tracking ??= "normal";
	props.weight ??= "normal";
	return <TextBase {...props} />;
}

export function Large({ ...props }: TextProps) {
	props.as ??= "span";
	props.color ??= "foreground";
	props.italic ??= false;
	props.size ??= "lg";
	props.tracking ??= "normal";
	props.weight ??= "semibold";
	return <TextBase {...props} />;
}

export function Small({ ...props }: TextProps) {
	props.as ??= "small";
	props.color ??= "foreground";
	props.italic ??= false;
	props.size ??= "sm";
	props.tracking ??= "normal";
	props.weight ??= "medium";
	return <TextBase className="leading-none" {...props} />;
}

export function Muted({ ...props }: TextProps) {
	props.as ??= "span";
	props.color ??= "muted-foreground";
	props.italic ??= false;
	props.size ??= "sm";
	props.tracking ??= "normal";
	props.weight ??= "normal";
	return <TextBase {...props} />;
}
