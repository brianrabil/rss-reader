import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/command-palette";
import * as Icon from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<Button variant="ghost" size="icon">
				<Icon.PanelLeftClose className="h-6 w-6" />
				<span className="sr-only">Toggle menu</span>
			</Button>
			<CommandPalette className="w-full max-w-3xl mx-auto" />
			<ThemeToggle />
		</header>
	);
}
