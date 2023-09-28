module.exports.rules = {
  'detect-incorrect-imports': {
    meta: {
      fixable: 'code',
    },
    create(context) {
      const { aliases } = context.options[0] || {};

      // Create an array of objects with alias and patterns
      const aliasPatterns = Object.keys(aliases).map((alias) => ({
        alias,
        patterns: Array.isArray(aliases[alias]) ? aliases[alias] : [aliases[alias]],
      }));

      return {
        ImportDeclaration(node) {
          const sourceValue = node.source.value;

          // Check if the source matches any of the specified patterns for each alias
          const matchedAlias = aliasPatterns.find(({ patterns }) => patterns.some((pattern) => sourceValue.includes(pattern)));

          if (matchedAlias) {
            const { alias, patterns } = matchedAlias;
            const relativePath = patterns.reduce(
              (acc, pattern) => (sourceValue.includes(pattern) ? sourceValue.split(pattern).pop() : acc),
              '',
            );

            const newPath = `"${alias}/${relativePath}"`;

            context.report({
              node,
              message: `Use ${alias} alias for imports from ${patterns.join(' or ')} directory.`,
              fix(fixer) {
                return fixer.replaceText(node.source, newPath);
              },
            });
          }
        },
      };
    },
  },
};
