import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Page = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${props => props.photo ? props.photo.color : 'none'};
  background-image: ${props => props.photo ? `url(${props.photo.urls.thumb})` : 'none'};
  background-image: ${props => props.photo ? `url(${props.photo.urls.full})` : 'none'};
  height: 100vh;
  width: 100vw;
`;

export default ({ children, photo }) => (
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
