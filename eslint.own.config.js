export const _default = {
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }], // https://stackoverflow.com/a/47996411
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'no-unused-vars': ['error', { varsIgnorePattern: '^(ignored)$', argsIgnorePattern: '^(ignored|event)$' }],
    'vue/no-use-v-if-with-v-for': 'off',
    "max-len": ["warn", {
      "ignoreTemplateLiterals": true,
      "ignoreStrings": true,
      "ignorePattern": "d=\"([\\s\\S]*?)\"",
      "ignoreUrls": true,
      "ignoreComments": true,
      "ignoreTrailingComments": true,
      "ignoreRegExpLiterals": true,
    }],
    "vue/block-lang": [
      "error",
      {
        "script": {
          "lang": ["ts", "js"], // needed to be able to upgrade existing code.
        }
      }
    ],
    "vue/multi-word-component-names": 'warn',
  },
};

export { _default as default };
