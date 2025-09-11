// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql',
  ignoreNoDocuments: true,
  generates: {
    './src/types/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;