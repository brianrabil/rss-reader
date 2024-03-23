"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as Icon from "@/components/icon";
import * as Text from "@/components/text";
import { toast } from "sonner";

export function ThemeToggle() {
	const { setTheme } = useTheme();

	const handleSetTheme = (theme: "light" | "dark" | "system") => {
		setTheme(theme);
		toast.info(`Theme set to ${theme}`);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="text-muted-foreground">
					<Icon.Sun className="h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Icon.Moon className="absolute h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<Text.Span sr-only>Toggle theme</Text.Span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleSetTheme("light")}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleSetTheme("dark")}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleSetTheme("system")}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
