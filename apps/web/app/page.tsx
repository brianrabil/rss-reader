import React from "react";
import Link from "next/link";

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
	return (
		<div>
			<nav className="bg-white shadow">
				<div className="container mx-auto px-6 py-3">
					<div className="flex justify-between items-center">
						<div className="text-lg font-semibold">RSS Reader</div>
						<div className="flex space-x-4">
							<a href="#" className="hover:text-gray-600">
								Features
							</a>
							<a href="#" className="hover:text-gray-600">
								Pricing
							</a>
							<Link
								href="/register"
								className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
							>
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</nav>

			<header className="text-center py-16 bg-blue-500 text-white">
				<h1 className="text-4xl font-bold">Stay Updated with Your Favorite Feeds</h1>
				<p className="mt-4">
					The ultimate RSS reader for aggregating all your news and blog feeds in one place.
				</p>
				<a href="#" className="mt-8 inline-block bg-white text-blue-500 px-5 py-3 rounded shadow">
					Get Started
				</a>
			</header>

			<section className="container mx-auto px-6 py-20">
				<h2 className="text-3xl font-bold text-center">Features</h2>
				<div className="flex flex-wrap mt-16">
					<div className="w-full md:w-1/3 px-2 mb-8">
						<div className="bg-white rounded shadow py-6 px-4">
							<h3 className="text-xl font-semibold">Feature One</h3>
							<p className="mt-2">Description of feature one. How it helps the user.</p>
						</div>
					</div>

					<div className="w-full md:w-1/3 px-2 mb-8">
						<div className="bg-white rounded shadow py-6 px-4">
							<h3 className="text-xl font-semibold">Feature Two</h3>
							<p className="mt-2">Description of feature two. Its benefits.</p>
						</div>
					</div>

					<div className="w-full md:w-1/3 px-2 mb-8">
						<div className="bg-white rounded shadow py-6 px-4">
							<h3 className="text-xl font-semibold">Feature Three</h3>
							<p className="mt-2">Explanation of feature three. Why it&apos;s important.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-gray-200 py-20">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center">What Users Say</h2>
					<div className="mt-16">
						<p className="text-center italic">
							&quot;I&apos;ve tried many RSS readers but this one stands out because of its ease of
							use and clean interface.&quot;
						</p>
						<p className="mt-4 text-center">- User Name</p>
					</div>
				</div>
			</section>

			<footer className="bg-white shadow text-center py-4">
				<p>&copy; 2024 RSS Reader. All rights reserved.</p>
			</footer>
		</div>
	);
}
