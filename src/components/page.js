import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Page = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${props => props.photo ? props.photo.color : 'none'};
  background-image: ${props => props.photo ? `url(${props.photo.urls.thumb})` : 'none'};
  height: 100vh;
  width: 100vw;
`;

const PageComponent = ({ children, photo }) => (
  <React.Fragment>
    <Helmet>
      <style type="text/css">{`
        html, body {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
      `}
      </style>
    </Helmet>
    <Page photo={photo}>
      {children}
    </Page>
  </React.Fragment>
);

PageComponent.propTypes = {
  children: PropTypes.element,
  photo: PropTypes.shape({
    color: PropTypes.string,
  })
};

PageComponent.defaultProps = {
  children: null,
  photo: {
    color: '#dddddd',
    urls: {
      thumb: 'https://via.placeholder.com/250'
    }
  }
};

export default  PageComponent;
