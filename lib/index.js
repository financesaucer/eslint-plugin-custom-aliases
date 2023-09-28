module.exports.rules = {
    'detect-incorrect-imports': {
        meta: {
            fixable: 'code',
        },
        create(context) {
            const { aliases } = context.options[0] || {};

            // Create a regular expression pattern for each alias
            const aliasPatterns = Object.keys(aliases).map((alias) => ({
                alias,
                pattern: aliases[alias],
            }));

            return {
                ImportDeclaration(node) {
                    const sourceValue = node.source.value;

                    // Check if the source matches any of the specified patterns
                    const matchedAlias = aliasPatterns.find(({ pattern }) => sourceValue.includes(pattern));

                    if (matchedAlias) {
                        const { alias, pattern } = matchedAlias;
                        const relativePath = sourceValue.split(pattern).pop(); // Get the part after the pattern
                        const newPath = `"${alias}/${relativePath}"`;

                        context.report({
                            node,
                            message: `Use ${alias} alias for imports from ${pattern} directory.`,
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
