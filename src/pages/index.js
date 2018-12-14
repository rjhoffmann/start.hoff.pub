import React from 'react'
import _sample from 'lodash/sample';
import { graphql } from 'gatsby';

import Page from '../components/page';

// class StartPage extends React.Component {
//   render() {
//     const { edges: photos } = this.props.data.allUnsplashPhoto;
//     const { node: photo } = _sample(photos);

//     return (
//       <Page photo={photo}>
//         <div>
//           <span>Hello World!</span>
//         </div>
//       </Page>
//     )
//   }
// }

export default ({ data: { allUnsplashPhoto: { edges: photos } } }) => {
  const { node: photo } = _sample(photos);
  
  return (
    <Page photo={photo}>
      <div>
        <span>Hello World!</span>
      </div>
    </Page>
  )
};

export const query = graphql`
  query {
    allUnsplashPhoto {
      edges {
        node {
          id
          user {
            name
            portfolio_url
            username
          }
          color
          links {
            download_location
          }
          urls {
            full
            thumb
          }
        }
      }
    }
  }
`;
