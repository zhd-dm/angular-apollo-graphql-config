// Конфиг для расширения Apollo GraphQL для VSCode

module.exports = {
    client: {
        service: {
            name: "graphql-schema",
            url: "https://spacex-production.up.railway.app",
            skipSSLValidation: true,
        },
        excludes: ['node_modules//*'],
        includes: ['**/*.graphql'],
    },
};
