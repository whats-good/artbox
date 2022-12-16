/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n            query CollectionInfo($address: TokensQueryInput, $collectionAddress: CollectionsQueryInput) {\n              collections(\n                networks: [{network: ETHEREUM, chain: MAINNET}]\n                pagination: {limit: 9}\n                sort: {sortKey: CREATED, sortDirection: ASC}\n                where: $collectionAddress\n              ) {\n                nodes {\n                  address\n                  name\n                  symbol\n                  totalSupply\n                  description\n                }\n              }\n              tokens(\n                where: $address\n                pagination: {limit: 9}\n                networks: {network: ETHEREUM, chain: MAINNET}\n                sort: {sortKey: TOKEN_ID, sortDirection: DESC}\n              ) {\n                nodes {\n                  token {\n                    metadata\n                  }\n                }\n              }\n            }\n          ": types.CollectionInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n            query CollectionInfo($address: TokensQueryInput, $collectionAddress: CollectionsQueryInput) {\n              collections(\n                networks: [{network: ETHEREUM, chain: MAINNET}]\n                pagination: {limit: 9}\n                sort: {sortKey: CREATED, sortDirection: ASC}\n                where: $collectionAddress\n              ) {\n                nodes {\n                  address\n                  name\n                  symbol\n                  totalSupply\n                  description\n                }\n              }\n              tokens(\n                where: $address\n                pagination: {limit: 9}\n                networks: {network: ETHEREUM, chain: MAINNET}\n                sort: {sortKey: TOKEN_ID, sortDirection: DESC}\n              ) {\n                nodes {\n                  token {\n                    metadata\n                  }\n                }\n              }\n            }\n          "): (typeof documents)["\n            query CollectionInfo($address: TokensQueryInput, $collectionAddress: CollectionsQueryInput) {\n              collections(\n                networks: [{network: ETHEREUM, chain: MAINNET}]\n                pagination: {limit: 9}\n                sort: {sortKey: CREATED, sortDirection: ASC}\n                where: $collectionAddress\n              ) {\n                nodes {\n                  address\n                  name\n                  symbol\n                  totalSupply\n                  description\n                }\n              }\n              tokens(\n                where: $address\n                pagination: {limit: 9}\n                networks: {network: ETHEREUM, chain: MAINNET}\n                sort: {sortKey: TOKEN_ID, sortDirection: DESC}\n              ) {\n                nodes {\n                  token {\n                    metadata\n                  }\n                }\n              }\n            }\n          "];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;