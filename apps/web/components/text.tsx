import * as React from "react";
import { cn } from "@/lib/utils";

interface TextProps {
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
}

export function H1({ children, className }: TextProps) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-foreground text-4xl lg:text-5xl tracking-tight font-extrabold",
				className
			)}
		>
			{children}
		</h1>
	);
}

export function H2({ children, className }: TextProps) {
	return (
		<h2
			className={cn(
				"text-h2 text-foreground text-3xl tracking-tight font-semibold scroll-m-20 border-b pb-2 first:mt-0",
				className
			)}
		>
			{children}
		</h2>
	);
}

export function H3({ children, className }: TextProps) {
	return (
		<h3
			className={cn("scroll-m-20 text-foreground text-2xl tracking-tight font-semibold", className)}
		>
			{children}
		</h3>
	);
}

export function H4({ children, className }: TextProps) {
	return (
		<h4
			className={cn("scroll-m-20 text-foreground text-xl tracking-tight font-semibold", className)}
		>
			{children}
		</h4>
	);
}

export function P({ children, className }: TextProps) {
	return (
		<p
			className={cn(
				"text-foreground text-md tracking-normal font-normal leading-7 [&:not(:first-child)]:mt-6",
				className
			)}
		>
			{children}
		</p>
	);
}

export function Blockquote({ children, className }: TextProps) {
	return (
		<blockquote
			className={cn(
				"mt-6 border-l-2 pl-6 text-foreground text-md tracking-normal font-normal italic",
				className
			)}
		>
			{children}
		</blockquote>
	);
}

export function Lead({ children, className }: TextProps) {
	return (
		<p className={cn("text-muted-foreground text-xl tracking-normal font-normal", className)}>
			{children}
		</p>
	);
}

export function Large({ children, className }: TextProps) {
	return (
		<span className={cn("text-foreground text-lg tracking-normal font-semibold", className)}>
			{children}
		</span>
	);
}

export function Small({ children, className }: TextProps) {
	return (
		<small
			className={cn("leading-none text-foreground text-sm tracking-normal font-medium", className)}
		>
			{children}
		</small>
	);
}

export function Muted({ children, className }: TextProps) {
	return (
		<span className={cn("text-muted-foreground text-sm tracking-normal font-normal", className)}>
			{children}
		</span>
	);
}
