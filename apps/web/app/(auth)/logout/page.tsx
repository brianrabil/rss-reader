import Link from "next/link";
import { Button } from "@/components/ui/button";
// import {
// 	AlertDialogTrigger,
// 	AlertDialogTitle,
// 	AlertDialogDescription,
// 	AlertDialogHeader,
// 	AlertDialogCancel,
// 	AlertDialogAction,
// 	AlertDialogFooter,
// 	AlertDialogContent,
// 	AlertDialog,
// } from "@/components/ui/alert";

export default function Component() {
	return (
		<>
			<div className="px-4 py-6 md:py-8">
				<div className="flex flex-col gap-4 max-w-sm mx-auto text-center">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter">Logout</h1>
						<p className="text-gray-500/60 dark:text-gray-400/60">
							Are you sure you want to logout?
						</p>
					</div>
					<div className="flex flex-col gap-2 min-[300px]:flex-row">
						<Link
							className="flex-1 inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
							href="#"
						>
							Cancel
						</Link>
						<Button className="flex-1" variant="outline">
							Logout
						</Button>
					</div>
				</div>
			</div>
			{/* <AlertDialog>
				<AlertDialogTrigger asChild>
					<Button className="w-full max-w-sm mx-auto" variant="ghost">
						Show Dialog
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to log out? You will have to log in again to access your
							account.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Wait, no!</AlertDialogCancel>
						<AlertDialogAction>Yes, log me out</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog> */}
		</>
	);
}
