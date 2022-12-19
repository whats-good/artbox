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
    "\n  query CollectionInfo(\n    $tokenAddress: TokensQueryInput,\n    $collectionAddress: CollectionsQueryInput,\n    $aggregateStatAddress: CollectionAddressOwnerAddressAttributesInput!,\n    $ownerCountAddress: CollectionAddressAndAttributesInput!) {\n    tokens(\n      where: $tokenAddress\n      pagination: {limit: 9}\n      networks: {network: ETHEREUM, chain: MAINNET}\n      sort: {sortKey: TOKEN_ID, sortDirection: DESC}\n    ) {\n      nodes {\n        token {\n          collectionName\n          collectionAddress\n          description\n          image {\n            url\n          }\n          metadata\n          tokenContract {\n            description\n            name\n            symbol\n            totalSupply\n            collectionAddress\n          }\n          tokenId\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n    collections(\n      networks: [{network: ETHEREUM, chain: MAINNET}]\n      sort: {sortKey: CREATED, sortDirection: ASC}\n      where: $collectionAddress\n    ) {\n      nodes {\n        address\n        name\n        symbol\n        totalSupply\n        description\n        tokenStandard\n      }\n    }\n    aggregateStat {\n      salesVolume(where: $aggregateStatAddress) {\n        usdcPrice\n      }\n      ownerCount(\n        where: $ownerCountAddress\n        networks: {network: ETHEREUM, chain: MAINNET}\n      )\n    }\n  }\n": types.CollectionInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CollectionInfo(\n    $tokenAddress: TokensQueryInput,\n    $collectionAddress: CollectionsQueryInput,\n    $aggregateStatAddress: CollectionAddressOwnerAddressAttributesInput!,\n    $ownerCountAddress: CollectionAddressAndAttributesInput!) {\n    tokens(\n      where: $tokenAddress\n      pagination: {limit: 9}\n      networks: {network: ETHEREUM, chain: MAINNET}\n      sort: {sortKey: TOKEN_ID, sortDirection: DESC}\n    ) {\n      nodes {\n        token {\n          collectionName\n          collectionAddress\n          description\n          image {\n            url\n          }\n          metadata\n          tokenContract {\n            description\n            name\n            symbol\n            totalSupply\n            collectionAddress\n          }\n          tokenId\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n    collections(\n      networks: [{network: ETHEREUM, chain: MAINNET}]\n      sort: {sortKey: CREATED, sortDirection: ASC}\n      where: $collectionAddress\n    ) {\n      nodes {\n        address\n        name\n        symbol\n        totalSupply\n        description\n        tokenStandard\n      }\n    }\n    aggregateStat {\n      salesVolume(where: $aggregateStatAddress) {\n        usdcPrice\n      }\n      ownerCount(\n        where: $ownerCountAddress\n        networks: {network: ETHEREUM, chain: MAINNET}\n      )\n    }\n  }\n"): (typeof documents)["\n  query CollectionInfo(\n    $tokenAddress: TokensQueryInput,\n    $collectionAddress: CollectionsQueryInput,\n    $aggregateStatAddress: CollectionAddressOwnerAddressAttributesInput!,\n    $ownerCountAddress: CollectionAddressAndAttributesInput!) {\n    tokens(\n      where: $tokenAddress\n      pagination: {limit: 9}\n      networks: {network: ETHEREUM, chain: MAINNET}\n      sort: {sortKey: TOKEN_ID, sortDirection: DESC}\n    ) {\n      nodes {\n        token {\n          collectionName\n          collectionAddress\n          description\n          image {\n            url\n          }\n          metadata\n          tokenContract {\n            description\n            name\n            symbol\n            totalSupply\n            collectionAddress\n          }\n          tokenId\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n    collections(\n      networks: [{network: ETHEREUM, chain: MAINNET}]\n      sort: {sortKey: CREATED, sortDirection: ASC}\n      where: $collectionAddress\n    ) {\n      nodes {\n        address\n        name\n        symbol\n        totalSupply\n        description\n        tokenStandard\n      }\n    }\n    aggregateStat {\n      salesVolume(where: $aggregateStatAddress) {\n        usdcPrice\n      }\n      ownerCount(\n        where: $ownerCountAddress\n        networks: {network: ETHEREUM, chain: MAINNET}\n      )\n    }\n  }\n"];

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