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

export function CommandPalette() {
  return (
    <form className="m-0">
      <div className="relative">
        <CommandIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
          placeholder="Type a command or search..."
          type="search"
        />
      </div>
    </form>
  );
}
