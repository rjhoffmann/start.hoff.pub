import React from 'react'
import _sample from 'lodash/sample';
import { graphql } from 'gatsby';

import Page from '../components/page';

class StartPage extends React.Component {
  render() {
    if (this.props.data) {
      const { photo } = _sample(this.props.data.allUnsplashPhoto.photos);

      return (
        <Page photo={photo}>
          <span>Hello World.</span>
        </Page>
      )
    }

    return <div>loading</div>;
  }
}

export const query = graphql`
  query {
    allUnsplashPhoto {
      photos: edges {
        photo: node {
          id
          height
          width
          color
          urls {
            full
            thumb
          }
          fields {
            encoded
          }
        }
      }
    }
  }
`;

export default StartPage;
