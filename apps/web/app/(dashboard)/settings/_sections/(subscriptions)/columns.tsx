import { ColumnDef } from "@tanstack/react-table";
import { Feed } from "@rss-reader/database";

export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

export const columns: ColumnDef<Feed>[] = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	// {
	// 	accessorKey: "url",
	// 	header: "URL",
	// },
];
