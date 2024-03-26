"use client";
import { subscribeFeed } from "@/lib/actions/rss";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Feed } from "@rss-reader/database";

export function SubscribeButton({ feed }: { feed: Feed }) {
	return (
		<form
			action={(formData) =>
				subscribeFeed(formData)
					.then(() => toast.success("Subscribed to feed"))
					.catch(() => toast.error("Failed to subscribe to feed"))
			}
		>
			<input type="hidden" name="feedId" value={feed.id} />
			<Button variant="outline" type="submit">
				Subscribe
			</Button>
		</form>
	);
}
