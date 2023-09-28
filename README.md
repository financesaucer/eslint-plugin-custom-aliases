# eslint-plugin-detect-incorrect-imports

ESLint plugin to detect and auto-fix useless long imports and suggest replacements using aliases. Developed by financesaucer for 0xos project.

# Installation

```sh
npm install eslint-plugin-custom-aliases --save-dev
```

or

```sh
yarn add eslint-plugin-custom-aliases --dev
```

# Usage
In your ESLint configuration, add detect-incorrect-imports to the plugins section and configure the rule under rules.

```json
{
  "plugins": ["custom-aliases"],
  "rules": {
    "custom-aliases/detect-incorrect-imports": [
         "error", 
         { "aliases":
          { /* Add your aliases here */ 
          "alias" : "pattern to replace",
          "alias" : ["patterns to replace"],

          } 
          } 
    ]
  }
}
```

# Rule Details
This rule checks imports and suggests replacements using defined aliases. If an import matches an alias pattern, it recommends using the alias.

## Options
aliases (required): An object where keys are aliases and values are corresponding patterns.

## Examples
Suppose you have the following configuration:

### in your .eslintrc:
```sh
{
  "plugins": ["custom-aliases"],
  rules: {
        'custom-aliases/detect-incorrect-imports':
      ['error', {
          aliases: {
              '@src': '../src/',
              '@components': ['../src/components/', '../components/'],
          // Add more aliases and patterns as needed
          // IE: 'alias' : 'pattern'
          // IE: 'alias' : ['pattern1', 'pattern2' ...]
          },
      }],
}
```
With the above configuration, the rule will suggest using the @src alias for imports from the ../src/ or ../../../src/ directory etc. 
It will also auto-fix the import paths when running eslint --fix

# Contributing
- Fork the repository and clone it to your local machine.
- Create a new branch for your feature: git checkout -b my-feature.
- Commit your changes: git commit -m 'Add my feature'.
- Push to the branch: git push origin my-feature.
- Open a pull request on GitHub.

# License
This project is licensed under the MIT License - see the LICENSE file for details.