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
  username: Scalars['String'];
};

export type EditUserInput = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

/** Base error interface */
export type IError = {
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContract: SmartContract;
  createUser: User;
  deleteContract: SmartContract;
  editUser: User;
};


export type MutationCreateContractArgs = {
  input: ContractInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteContractArgs = {
  input: ContractInput;
};


export type MutationEditUserArgs = {
  input: EditUserInput;
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
  getAccounts: QueryGetAccountsResult;
  user: QueryUserResult;
};


export type QueryDiscoverUsersArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAccountsArgs = {
  address: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type QueryDiscoverUsersResult = NotFoundError | QueryDiscoverUsersSuccess | UnknownError;

export type QueryDiscoverUsersSuccess = {
  __typename?: 'QueryDiscoverUsersSuccess';
  data: Array<User>;
};

export type QueryGetAccountsResult = NotFoundError | QueryGetAccountsSuccess | UnknownError;

export type QueryGetAccountsSuccess = {
  __typename?: 'QueryGetAccountsSuccess';
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
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserInput = {
  address: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  smartContracts?: InputMaybe<Array<Scalars['String']>>;
  username: Scalars['String'];
};

export type UserOnContract = {
  __typename?: 'UserOnContract';
  id: Scalars['ID'];
  smartContractId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type CreateContractMutationVariables = Exact<{
  address: Scalars['String'];
  username: Scalars['String'];
}>;


export type CreateContractMutation = { __typename?: 'Mutation', createContract: { __typename?: 'SmartContract', contractAddress: string } };

export type CreateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', address: string } };

export type DeleteContractMutationVariables = Exact<{
  address: Scalars['String'];
  username: Scalars['String'];
}>;


export type DeleteContractMutation = { __typename?: 'Mutation', deleteContract: { __typename?: 'SmartContract', contractAddress: string } };

export type DiscoverUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type DiscoverUsersQuery = { __typename?: 'Query', discoverUsers: { __typename?: 'NotFoundError' } | { __typename: 'QueryDiscoverUsersSuccess', data: Array<{ __typename?: 'User', username: string }> } | { __typename?: 'UnknownError' } };

export type EditUserMutationVariables = Exact<{
  username: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'User', username: string } };

export type GetAccountsQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type GetAccountsQuery = { __typename?: 'Query', getAccounts: { __typename?: 'NotFoundError' } | { __typename: 'QueryGetAccountsSuccess', data: Array<{ __typename?: 'User', username: string, description?: string | null, address: string, contracts: Array<{ __typename?: 'SmartContract', contractAddress: string }> }> } | { __typename?: 'UnknownError' } };

export type UserInfoQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type UserInfoQuery = { __typename?: 'Query', user: { __typename?: 'NotFoundError' } | { __typename: 'QueryUserSuccess', data: { __typename?: 'User', address: string, description?: string | null, username: string, id: string, contracts: Array<{ __typename?: 'SmartContract', contractAddress: string }> } } | { __typename?: 'UnknownError' } };


export const CreateContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contractAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}}]}}]}}]} as unknown as DocumentNode<CreateContractMutation, CreateContractMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contractAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}}]}}]}}]} as unknown as DocumentNode<DeleteContractMutation, DeleteContractMutationVariables>;
export const DiscoverUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DiscoverUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discoverUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryDiscoverUsersSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DiscoverUsersQuery, DiscoverUsersQueryVariables>;
export const EditUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const GetAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAccounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetAccountsSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const UserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryUserSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;
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
  username: Scalars['String'];
};

export type EditUserInput = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

/** Base error interface */
export type IError = {
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContract: SmartContract;
  createUser: User;
  deleteContract: SmartContract;
  editUser: User;
};


export type MutationCreateContractArgs = {
  input: ContractInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteContractArgs = {
  input: ContractInput;
};


export type MutationEditUserArgs = {
  input: EditUserInput;
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
  getAccounts: QueryGetAccountsResult;
  user: QueryUserResult;
};


export type QueryDiscoverUsersArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAccountsArgs = {
  address: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type QueryDiscoverUsersResult = NotFoundError | QueryDiscoverUsersSuccess | UnknownError;

export type QueryDiscoverUsersSuccess = {
  __typename?: 'QueryDiscoverUsersSuccess';
  data: Array<User>;
};

export type QueryGetAccountsResult = NotFoundError | QueryGetAccountsSuccess | UnknownError;

export type QueryGetAccountsSuccess = {
  __typename?: 'QueryGetAccountsSuccess';
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
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserInput = {
  address: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  smartContracts?: InputMaybe<Array<Scalars['String']>>;
  username: Scalars['String'];
};

export type UserOnContract = {
  __typename?: 'UserOnContract';
  id: Scalars['ID'];
  smartContractId: Scalars['Int'];
  userId: Scalars['Int'];
};
