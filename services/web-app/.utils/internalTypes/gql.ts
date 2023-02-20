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
    "\n  mutation CreateContract($address: String!, $username: String!) {\n    createContract(input: {contractAddress: $address, username: $username}) {\n      contractAddress\n    }\n  }\n": types.CreateContractDocument,
    "\n  mutation CreateUser($address: String!, $username: String!) {\n    createUser(input: {address: $address, username: $username}) {\n      address\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation DeleteContract($address: String!, $username: String!) {\n    deleteContract(input: {contractAddress: $address, username: $username}) {\n      contractAddress\n    }\n  }\n": types.DeleteContractDocument,
    "\n  query DiscoverUsers {\n    discoverUsers {\n      ... on QueryDiscoverUsersSuccess {\n        __typename\n        data {\n          username\n        }\n      }\n    }\n  }\n": types.DiscoverUsersDocument,
    "\n  mutation EditUser($username: String!, $description: String) {\n    editUser(input: {username: $username, description: $description}) {\n      username\n    }\n  }\n": types.EditUserDocument,
    "\n  query GetAccounts($address: String!) {\n    getAccounts(address: $address) {\n      ... on QueryGetAccountsSuccess {\n        __typename\n        data {\n          username\n          description\n          address\n          contracts {\n            contractAddress\n          }\n        }\n      }\n    }\n  }\n": types.GetAccountsDocument,
    "\n  query userInfo($name: String!) {\n    user(username: $name) {\n      ... on QueryUserSuccess {\n        __typename\n        data {\n          address\n          contracts {\n            contractAddress\n          }\n          description\n          username\n          id\n        }\n      }\n    }\n  }\n": types.UserInfoDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateContract($address: String!, $username: String!) {\n    createContract(input: {contractAddress: $address, username: $username}) {\n      contractAddress\n    }\n  }\n"): (typeof documents)["\n  mutation CreateContract($address: String!, $username: String!) {\n    createContract(input: {contractAddress: $address, username: $username}) {\n      contractAddress\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($address: String!, $username: String!) {\n    createUser(input: {address: $address, username: $username}) {\n      address\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($address: String!, $username: String!) {\n    createUser(input: {address: $address, username: $username}) {\n      address\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteContract($address: String!, $username: String!) {\n    deleteContract(input: {contractAddress: $address, username: $username}) {\n      contractAddress\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteContract($address: String!, $username: String!) {\n    deleteContract(input: {contractAddress: $address, username: $username}) {\n      contractAddress\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query DiscoverUsers {\n    discoverUsers {\n      ... on QueryDiscoverUsersSuccess {\n        __typename\n        data {\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query DiscoverUsers {\n    discoverUsers {\n      ... on QueryDiscoverUsersSuccess {\n        __typename\n        data {\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditUser($username: String!, $description: String) {\n    editUser(input: {username: $username, description: $description}) {\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation EditUser($username: String!, $description: String) {\n    editUser(input: {username: $username, description: $description}) {\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAccounts($address: String!) {\n    getAccounts(address: $address) {\n      ... on QueryGetAccountsSuccess {\n        __typename\n        data {\n          username\n          description\n          address\n          contracts {\n            contractAddress\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAccounts($address: String!) {\n    getAccounts(address: $address) {\n      ... on QueryGetAccountsSuccess {\n        __typename\n        data {\n          username\n          description\n          address\n          contracts {\n            contractAddress\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query userInfo($name: String!) {\n    user(username: $name) {\n      ... on QueryUserSuccess {\n        __typename\n        data {\n          address\n          contracts {\n            contractAddress\n          }\n          description\n          username\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query userInfo($name: String!) {\n    user(username: $name) {\n      ... on QueryUserSuccess {\n        __typename\n        data {\n          address\n          contracts {\n            contractAddress\n          }\n          description\n          username\n          id\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;