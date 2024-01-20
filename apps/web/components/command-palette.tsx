import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { Input } from "./ui/input";
import { CommandIcon } from "./icon";
import { cn } from "./../lib/utils";

interface CommandPaletteProps {
  className?: string;
}

export function CommandPalette({ className }: CommandPaletteProps) {
  return (
    <form className={cn("m-0", className)}>
      <div className="relative w-full">
        <CommandIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          className="w-full bg-white shadow-none appearance-none w-full pl-8 dark:bg-gray-950"
          placeholder="Type a command or search..."
          type="search"
        />
      </div>
    </form>
  );
}
