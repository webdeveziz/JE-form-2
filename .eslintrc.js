module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 2],
        semi: ['error', 'never'],
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never', asyncArrow: 'always' }
        ],
        'multiline-ternary': ['off'],
        'no-useless-return': ['off'],
        'no-constant-condition': ['error', { checkLoops: true }],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'no-trailing-spaces': ['error', { skipBlankLines: true }],
        'dot-notation': ['error', { allowKeywords: false }],
        'spaced-comment': ["error", "always"]
    }
}
