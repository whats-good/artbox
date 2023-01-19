/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ContractInput = {
  contractAddress: Scalars['String'];
  userAddress: Scalars['String'];
};

/** Base error interface */
export type IError = {
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContract: SmartContract;
  createUser: User;
};


export type MutationCreateContractArgs = {
  input: ContractInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};

export type Network = {
  __typename?: 'Network';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Error thrown when a resource is not found */
export type NotFoundError = IError & {
  __typename?: 'NotFoundError';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  discoverUsers: QueryDiscoverUsersResult;
  user: QueryUserResult;
};


export type QueryDiscoverUsersArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type QueryDiscoverUsersResult = NotFoundError | QueryDiscoverUsersSuccess | UnknownError;

export type QueryDiscoverUsersSuccess = {
  __typename?: 'QueryDiscoverUsersSuccess';
  data: Array<User>;
};

export type QueryUserResult = NotFoundError | QueryUserSuccess | UnknownError;

export type QueryUserSuccess = {
  __typename?: 'QueryUserSuccess';
  data: User;
};

export type SmartContract = {
  __typename?: 'SmartContract';
  contractAddress: Scalars['String'];
  id: Scalars['ID'];
  network: Network;
  users: Array<UserOnContract>;
};

/** Error thrown when an unknown error occurs */
export type UnknownError = IError & {
  __typename?: 'UnknownError';
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  contracts: Array<SmartContract>;
  description: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserInput = {
  address: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserOnContract = {
  __typename?: 'UserOnContract';
  id: Scalars['ID'];
  smartContractId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type UserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoQuery = { __typename?: 'Query', user: { __typename?: 'NotFoundError' } | { __typename: 'QueryUserSuccess', data: { __typename?: 'User', address: string, description: string, username: string, contracts: Array<{ __typename?: 'SmartContract', contractAddress: string }> } } | { __typename?: 'UnknownError' } };


export const UserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"StringValue","value":"Oxlogan","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryUserSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ContractInput = {
  contractAddress: Scalars['String'];
  userAddress: Scalars['String'];
};

/** Base error interface */
export type IError = {
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContract: SmartContract;
  createUser: User;
};


export type MutationCreateContractArgs = {
  input: ContractInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};

export type Network = {
  __typename?: 'Network';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Error thrown when a resource is not found */
export type NotFoundError = IError & {
  __typename?: 'NotFoundError';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  discoverUsers: QueryDiscoverUsersResult;
  user: QueryUserResult;
};


export type QueryDiscoverUsersArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type QueryDiscoverUsersResult = NotFoundError | QueryDiscoverUsersSuccess | UnknownError;

export type QueryDiscoverUsersSuccess = {
  __typename?: 'QueryDiscoverUsersSuccess';
  data: Array<User>;
};

export type QueryUserResult = NotFoundError | QueryUserSuccess | UnknownError;

export type QueryUserSuccess = {
  __typename?: 'QueryUserSuccess';
  data: User;
};

export type SmartContract = {
  __typename?: 'SmartContract';
  contractAddress: Scalars['String'];
  id: Scalars['ID'];
  network: Network;
  users: Array<UserOnContract>;
};

/** Error thrown when an unknown error occurs */
export type UnknownError = IError & {
  __typename?: 'UnknownError';
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  contracts: Array<SmartContract>;
  description: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserInput = {
  address: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserOnContract = {
  __typename?: 'UserOnContract';
  id: Scalars['ID'];
  smartContractId: Scalars['Int'];
  userId: Scalars['Int'];
};
