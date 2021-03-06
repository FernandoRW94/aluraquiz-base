module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-props-no-spreading': [0, {}],
        'no-console': 'off',
        'no-unused-vars': 'off',
        'react/prop-types': [0, {}],
        'max-len': [0, {}],
        'func-names': [0, {}],
        'linebreak-style': [0, {}],
        indent: [1, 4, {}],
        'react/jsx-indent': [1, 4, {}],
        'react/jsx-indent-props': [1, 4],
    },
};
