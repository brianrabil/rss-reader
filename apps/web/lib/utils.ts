import * as React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple classnames into a single string
 * @param inputs
 * @returns string
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Responsive config type
 */
type ResponsiveConfig<T> = {
	base: T;
	sm?: T;
	md?: T;
	lg?: T;
	xl?: T;
};

/**
 * Responsive prop type
 */
export type ResponsiveProp<T> = T | ResponsiveConfig<T>;

/**
 * Check if prop is a responsive prop
 * @param prop - Static or Responsive prop
 * @returns boolean
 * @example
 * ```tsx
 * isResponsiveProp("text-lg") // false
 * isResponsiveProp({ base: "text-lg", sm: "text-xl" }) // true
 * isResponsiveProp({ base: "text-lg" }) // true
 * isResponsiveProp({ base: "text-lg", sm: "text-xl", md: "text-2xl", lg: "text-3xl", xl: "text-4xl" }) // true
 * ```
 */
function isResponsiveConfig<T>(prop: ResponsiveProp<T>): prop is ResponsiveConfig<T> {
	return typeof prop === "object" && prop !== null && "base" in prop;
}

/**
 * Returns a Tailwind CSS className string with responsive modifiers
 * @param twKey - Tailwind CSS key
 * @param prop - Static or Responsive prop
 * @returns tailwind className string with responsive modifiers
 */
export function useResponsiveClass<T>(twKey: string, prop: ResponsiveProp<T>) {
	return React.useMemo(() => {
		if (!prop) return;

		if (isResponsiveConfig(prop)) {
			return Object.entries(prop).reduce((acc, [key, value]) => {
				if (key === "base") {
					return cn(acc, `${twKey}-${value}`);
				} else if (value) {
					return cn(acc, `${key}:${twKey}-${value}`);
				} else {
					return acc;
				}
			}, "");
		}

		return `${twKey}-${prop}`;
	}, [prop, twKey]);
}
