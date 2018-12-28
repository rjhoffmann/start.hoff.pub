import React from 'react'
import _sample from 'lodash/sample';
import { graphql } from 'gatsby';

import Page, { StyledHeader as Header, StyledMain as Main, StyledFooter as Footer } from '../components/page';

class StartPage extends React.Component {
  render() {
    if (this.props.data) {
      const { photo } = _sample(this.props.data.allUnsplashPhoto.photos);

      return (
        <Page photo={photo}>
          <Header>
            Header
          </Header>
          <Main>
            Main - Hello World
          </Main>
          <Footer>
            Footer
          </Footer>
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
