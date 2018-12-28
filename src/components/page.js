import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { ImageHelper } from 'react-preload';

const StyledContainer = styled.div`
  position: relative;
  height: 100vh; width: 100vw;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${props => props.image};

  &:before {
    position: absolute;
    z-index: 20;
    top: 0; right: 0; bottom: 0; left: 0;
    height: 100vh; width: 100vw;
    background-color: rgba(0,0,0,.4);
  }
`;

const StyledThumbnail = styled.div`
  position: absolute;
  z-index: 10;
  top: 0; right: 0; bottom: 0; left: 0;
  height: 100vh; width: 100vw;
  opacity: ${props => props.loaded ? 0 : 1};
  transition: opacity 1s .4s;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${props => props.thumbnail};
`;

const StyledContent = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 30px 1fr 30px;
  grid-template-columns: 10% 80% 10%;
  grid-template-areas: 
    "header header header"
    ". main ."
    "footer footer footer";
  z-index: 30;
  padding: 20px;
  width: 100%; height: 100%;
`;

export const StyledHeader = styled.div`
  grid-area: header;
`;

export const StyledMain = styled.div`
  grid-area: main;
`;

export const StyledFooter = styled.div`
  grid-area: footer;
`;

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
  }

  componentDidMount() {
    ImageHelper.loadImage(this.props.photo.urls.full)
      .then(() => this.setState({ ready: true }));
  }

  render() {
    const { photo, children } = this.props;

    const svgString = encodeURIComponent(renderToStaticMarkup(
      <svg xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={photo.width}
        height={photo.height}
        viewBox={`0 0 ${photo.width} ${photo.height}`}>
        <filter id="blur" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="20 20" edgeMode="duplicate" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="1 1" />
          </feComponentTransfer>
        </filter>
        <image filter="url(#blur)"
          xlinkHref={`data:image/jpeg;base64,${photo.fields.encoded}`}
          x="0"
          y="0"
          height="100%"
          width="100%" />
      </svg>
    ));

    return (
      <React.Fragment>
        <Helmet>
          <style type="text/css">{`
            html, body {
              height: 100%;
              width: 100%;
              overflow: hidden;
              scrollbar-width: none;
            }
          `}
          </style>
        </Helmet>
        <StyledContainer image={`url('${photo.urls.full}')`}>
          <StyledThumbnail
            thumbnail={`url("data:image/svg+xml,${svgString}")`}
            loaded={this.state.ready} />
          <StyledContent>
            {children}
          </StyledContent>
        </StyledContainer>
      </React.Fragment>
    )
  }
}

PageComponent.propTypes = {
  children: PropTypes.element,
  photo: PropTypes.shape({
    color: PropTypes.string,
    fields: PropTypes.shape({
      encoded: PropTypes.string,
    }),
  }),
};

export default PageComponent;
