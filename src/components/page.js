import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Page = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
`;

export default ({ children }) => (
  <React.Fragment>
    <Helmet>
      <style type="text/css">{`
        html, body {
          height: 100%;
          width: 100%;
        }
      `}
      </style>
    </Helmet>
    <Page>
      {children}
    </Page>
  </React.Fragment>
);
