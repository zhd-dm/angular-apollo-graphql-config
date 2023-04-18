import * as SchemaTypes from '@graphql-generated/graphql-types.generated';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type DragonsQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type DragonsQuery = { __typename?: 'Query', dragons: Array<{ __typename?: 'Dragon', id: string | null, name: string | null } | null> | null };

export const DragonsDocument = gql`
    query Dragons {
  dragons {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DragonsGQL extends Apollo.Query<DragonsQuery, DragonsQueryVariables> {
    override document = DragonsDocument;
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
      private dragonsGql: DragonsGQL
    ) {}
      
    dragons(variables?: DragonsQueryVariables, options?: QueryOptionsAlone<DragonsQueryVariables>) {
      return this.dragonsGql.fetch(variables, options)
    }
    
    dragonsWatch(variables?: DragonsQueryVariables, options?: WatchQueryOptionsAlone<DragonsQueryVariables>) {
      return this.dragonsGql.watch(variables, options)
    }
  }