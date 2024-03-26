"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { unsubscribeFeed } from "@/lib/actions/rss";
import type { Feed } from "@rss-reader/database";
import { toast } from "sonner";

export const dynamic = "force-dynamic";

const columns: ColumnDef<Feed>[] = [
	{
		accessorKey: "favicon",
		header: () => null,
		cell(props) {
			return <img src={props.getValue<string>()} alt="favicon" className="w-6 h-6" />;
		},
	},
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "id",
		header: () => null,
		cell: (props) => (
			<form
				className="flex justify-end w-full"
				action={(formData) =>
					unsubscribeFeed(formData)
						.then(() => toast.success("Unsubscribed successfully."))
						.catch(() => toast.error("Failed to unsubscribe."))
				}
			>
				<input
					name="id"
					className="w-0 hidden pointer-events-none select-none"
					defaultValue={props.getValue<string>()}
				/>
				<Button type="submit" variant="ghost">
					Unsubscribe
				</Button>
			</form>
		),
	},
];

export function DataTable({ data }: { data: Feed[] }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
