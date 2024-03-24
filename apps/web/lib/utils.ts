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
