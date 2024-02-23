import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";
import "./globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Next.js",
	description: "Generated by Next.js",
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
	return (
		<html>
			<body>
				<div className={cn("font-sans antialiased ", fontSans.variable)}>{children}</div>
			</body>
		</html>
	);
}
