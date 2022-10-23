import { createServer } from '@graphql-yoga/node';
import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';

export class ArtBoxBaseError extends Error {}

export class ExampleError extends ArtBoxBaseError {}

const builder = new SchemaBuilder({
  notStrict:
    'Pothos may not work correctly when strict mode is not enabled in tsconfig.json',
  plugins: [ErrorsPlugin],
  errorOptions: {
    defaultTypes: [],
  },
});

export const IErrorInterface = builder
  .interfaceRef<ArtBoxBaseError>('IError')
  .implement({
    description: 'Base error interface',
    fields: (t) => ({
      message: t.exposeString('message', {}),
    }),
  });

builder.objectType(ExampleError, {
  name: 'ExampleError',
  fields: (t) => ({
    message: t.exposeString('message', {}),
  }),
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      errors: {
        types: [ExampleError],
        directResult: false,
      },
      resolve: () => 'world',
    }),
  }),
});

const server = createServer({
  schema: builder.toSchema(),
});

server.start();
