import * as SchemaTypes from '@graphql-generated/graphql-types.generated';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type Users_By_PkSubscriptionVariables = SchemaTypes.Exact<{
  usersByPkId: SchemaTypes.Scalars['uuid'];
}>;


export type Users_By_PkSubscription = { __typename?: 'Subscription', users_by_pk: { __typename?: 'users', id: string, name: string | null, rocket: string | null, timestamp: string, twitter: string | null } | null };

export type UsersSubscriptionVariables = SchemaTypes.Exact<{
  orderBy: SchemaTypes.InputMaybe<Array<SchemaTypes.Users_Order_By> | SchemaTypes.Users_Order_By>;
  limit: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>;
  distinctOn: SchemaTypes.InputMaybe<Array<SchemaTypes.Users_Select_Column> | SchemaTypes.Users_Select_Column>;
}>;


export type UsersSubscription = { __typename?: 'Subscription', users: Array<{ __typename?: 'users', id: string, name: string | null, rocket: string | null, timestamp: string, twitter: string | null }> };

export const Users_By_PkDocument = gql`
    subscription Users_by_pk($usersByPkId: uuid!) {
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
  export class Users_By_PkGQL extends Apollo.Subscription<Users_By_PkSubscription, Users_By_PkSubscriptionVariables> {
    override document = Users_By_PkDocument;
    override client = 'GqlGatewayService';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UsersDocument = gql`
    subscription Users($orderBy: [users_order_by!], $limit: Int, $distinctOn: [users_select_column!]) {
  users(order_by: $orderBy, limit: $limit, distinct_on: $distinctOn) {
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
  export class UsersGQL extends Apollo.Subscription<UsersSubscription, UsersSubscriptionVariables> {
    override document = UsersDocument;
    override client = 'GqlGatewayService';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface SubscriptionOptionsAlone<V> extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class GqlSdkService {
    constructor(
      private usersByPkGql: Users_By_PkGQL,
      private usersGql: UsersGQL
    ) {}
      
    usersByPk(variables: Users_By_PkSubscriptionVariables, options?: SubscriptionOptionsAlone<Users_By_PkSubscriptionVariables>) {
      return this.usersByPkGql.subscribe(variables, options)
    }
    
    users(variables?: UsersSubscriptionVariables, options?: SubscriptionOptionsAlone<UsersSubscriptionVariables>) {
      return this.usersGql.subscribe(variables, options)
    }
  }