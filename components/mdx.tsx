import fs from 'node:fs';
import { compileMDX } from 'next-mdx-remote/rsc';

export default async function MDX({ filePath }: { filePath: string }) {
	const source = fs.readFileSync(filePath, 'utf8');
	const { content } = await compileMDX({ source });
	return <article>{content}</article>;
}


