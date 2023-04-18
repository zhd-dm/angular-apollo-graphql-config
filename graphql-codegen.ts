// Конфиг для скачивания схемы, генерации TS типов и Angular сервисов

import type { CodegenConfig } from '@graphql-codegen/cli';

const scalars = {
    Date: 'string',
    ObjectID: 'number',
    timestamptz: 'string',
    uuid: 'string',
};

const config: CodegenConfig = {
    schema: 'graphql/generated/graphql-schema.json',
    generates: {

        // Генерирует TS типы на основе GQL схемы

        'graphql/generated/graphql-types.generated.ts': {
            plugins: ['typescript'],
            config: {
                avoidOptionals: false,
                scalars,
                strictScalars: true
            }
        },

        // Генерирует Angular сервисы на основе запросов, описанных в .graphql файлах
        // Создает директорию generated рядом с описанным запросом с расширением .graphql
        // Внутри директории генерирует сервис

        'src/': {
            documents: ['**/*.graphql'],
            preset: 'near-operation-file',
            presetConfig: {
                baseTypesPath: '~@graphql-generated/graphql-types.generated',
                extension: '.ts',
                importTypesNamespace: 'SchemaTypes',
                folder: 'generated'
            },
            plugins: ['typescript-operations', 'typescript-apollo-angular'],
            config: {
                avoidOptionals: true,
                scalars,
                strictScalars: true,
                namedClient: 'GqlGatewayService',
                serviceName: 'GqlSdkService',
                sdkClass: true, // создает SDK-оболочку над сгенерированными сервисами
                addExplicitOverride: true,
                dedupeOperationSuffix: true
            }
        }
    }
};
export default config;
