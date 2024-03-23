import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "RSS Reader",
	description: "Read anything.",
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
	return (
		<html>
			<body className={cn("font-sans antialiased ", fontSans.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
