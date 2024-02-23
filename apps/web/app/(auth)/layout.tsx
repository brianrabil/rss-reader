import * as React from "react";

export default function LoginLayout({ children }: { readonly children: React.ReactNode }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
			{children}
		</div>
	);
}
