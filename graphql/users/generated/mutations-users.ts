import * as SchemaTypes from '@graphql-generated/graphql-types.generated';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type Update_UsersMutationVariables = SchemaTypes.Exact<{
  where: SchemaTypes.Users_Bool_Exp;
}>;


export type Update_UsersMutation = { __typename?: 'Mutation', update_users: { __typename?: 'users_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'users', id: string, name: string | null, rocket: string | null, timestamp: string, twitter: string | null }> } | null };

export const Update_UsersDocument = gql`
    mutation Update_users($where: users_bool_exp!) {
  update_users(where: $where) {
    affected_rows
    returning {
      id
      name
      rocket
      timestamp
      twitter
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class Update_UsersGQL extends Apollo.Mutation<Update_UsersMutation, Update_UsersMutationVariables> {
    override document = Update_UsersDocument;
    override client = 'GqlGatewayService';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface MutationOptionsAlone<T, V> extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class GqlSdkService {
    constructor(
      private updateUsersGql: Update_UsersGQL
    ) {}
      
    updateUsers(variables: Update_UsersMutationVariables, options?: MutationOptionsAlone<Update_UsersMutation, Update_UsersMutationVariables>) {
      return this.updateUsersGql.mutate(variables, options)
    }
  }