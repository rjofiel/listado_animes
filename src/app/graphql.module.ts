import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://graphql.anilist.co'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  console.log(httpLink);

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');

    if (token) {

      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        }
      }
    } else {
      return {
        headers: {
          ...headers,
        }
      }
    }
  })

  return {
    link: authLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache()
  }

}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
