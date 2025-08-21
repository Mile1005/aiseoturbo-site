import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: `blog/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		description: { type: 'string', required: false },
		date: { type: 'date', required: true },
		published: { type: 'boolean', required: false, default: true },
	},
	computedFields: {
		slug: {
			type: 'string',
			resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\//, ''),
		},
	},
}));

export default makeSource({
	contentDirPath: 'content',
	documentTypes: [Post],
});


