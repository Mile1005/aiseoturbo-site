module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: ['@typescript-eslint'],
	extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
	ignorePatterns: ['.next', 'node_modules']
};


