import * as SchemaTypes from '@graphql-generated/graphql-types.generated';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type UsersQueryVariables = SchemaTypes.Exact<{
  limit: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>;
  offset: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>;
  where: SchemaTypes.InputMaybe<SchemaTypes.Users_Bool_Exp>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'users', id: string, name: string | null, rocket: string | null, twitter: string | null, timestamp: string }> };

export type Users_By_PkQueryVariables = SchemaTypes.Exact<{
  usersByPkId: SchemaTypes.Scalars['uuid'];
}>;


export type Users_By_PkQuery = { __typename?: 'Query', users_by_pk: { __typename?: 'users', id: string, name: string | null, rocket: string | null, timestamp: string, twitter: string | null } | null };

export const UsersDocument = gql`
    query Users($limit: Int, $offset: Int, $where: users_bool_exp) {
  users(limit: $limit, offset: $offset, where: $where) {
    id
    name
    rocket
    twitter
    timestamp
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    override document = UsersDocument;
    override client = 'GqlGatewayService';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const Users_By_PkDocument = gql`
    query Users_by_pk($usersByPkId: uuid!) {
  users_by_pk(id: $usersByPkId) {
    id
    name
    rocket
    timestamp
    twitter
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class Users_By_PkGQL extends Apollo.Query<Users_By_PkQuery, Users_By_PkQueryVariables> {
    override document = Users_By_PkDocument;
    override client = 'GqlGatewayService';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V> extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}

  interface QueryOptionsAlone<V> extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class GqlSdkService {
    constructor(
      private usersGql: UsersGQL,
      private usersByPkGql: Users_By_PkGQL
    ) {}
      
    users(variables?: UsersQueryVariables, options?: QueryOptionsAlone<UsersQueryVariables>) {
      return this.usersGql.fetch(variables, options)
    }
    
    usersWatch(variables?: UsersQueryVariables, options?: WatchQueryOptionsAlone<UsersQueryVariables>) {
      return this.usersGql.watch(variables, options)
    }
    
    usersByPk(variables: Users_By_PkQueryVariables, options?: QueryOptionsAlone<Users_By_PkQueryVariables>) {
      return this.usersByPkGql.fetch(variables, options)
    }
    
    usersByPkWatch(variables: Users_By_PkQueryVariables, options?: WatchQueryOptionsAlone<Users_By_PkQueryVariables>) {
      return this.usersByPkGql.watch(variables, options)
    }
  }