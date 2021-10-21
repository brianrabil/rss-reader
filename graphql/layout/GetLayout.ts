import { gql } from '@apollo/client';

export const GetLayout = gql`
  query GetLayout {
    layout @client {
      topNavHeight
      sourcesDrawer {
        open
        width
      }
      articlesDrawer {
        open
        width
      }
    }
  }
`;
