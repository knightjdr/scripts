module.exports = {
    "env": {
        "es6": true,
        "jest": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016
    },
    "rules": {
        "comma-dangle": ["error", {
          "arrays": "always",
          "objects": "always",
          "imports": "always",
          "exports": "always",
          "functions": "ignore"
        }],
        "eol-last": [
          "error",
          "always"
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-trailing-spaces": ["error"],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};