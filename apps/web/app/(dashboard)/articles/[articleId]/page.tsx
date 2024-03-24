"use server";

export default async function ArticlePage({ params }: { params: { articleId: string } }) {
	console.log(params);

	return <div>Article Page {params.articleId}</div>;
}
