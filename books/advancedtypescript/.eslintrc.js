module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/no-inferrable-types": 2,
        "@typescript-eslint/no-non-null-assertion": 2
    }
};