import { type ReactNode } from "react";
import { LeftPanel } from "@/app/(dashboard)/left-panel";
import { auth } from "../../lib/auth";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Header } from "@/app/(dashboard)/header";
import { getUser } from "@/lib/actions";

export default async function DashboardLayout({ children }: { readonly children: ReactNode }) {
	const user = await getUser();
	return (
		<ResizablePanelGroup direction="horizontal" className="max-w-screen max-h-screen">
			<ResizablePanel defaultSize={25} minSize={10} maxSize={30}>
				<LeftPanel user={user} />
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={75} maxSize={90} minSize={70}>
				<div className="flex flex-col relative h-screen w-full overflow-hidden">
					<div className="h-screen w-auto overflow-y-auto">
						<Header />
						<main className="w-full flex flex-1">{children}</main>
					</div>
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
