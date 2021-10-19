import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { layoutVar } from "./layout";

export const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          layout: {
            read() {
              return layoutVar();
            }
          }
        }
      } 
    },
  }),
});
