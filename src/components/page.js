import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

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
  transition: opacity .4s .6s;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${props => props.thumbnail};
`;

const StyledContent = styled.div`
  position: relative;
  z-index: 30;
  padding: 100px 20px;
`;

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFullImageLoaded: false };
  }

  componentDidMount() {
    const image = new Image();
    image.src = this.props.photo.urls.full;
    image.onload = () => this.setState({ isFullImageLoaded: true });
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
            }
          `}
          </style>
        </Helmet>
        <StyledContainer image={`url('${photo.urls.full}')`}>
          <StyledThumbnail
            thumbnail={`url("data:image/svg+xml,${svgString}")`}
            loaded={this.state.isFullImageLoaded} />
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

export default  PageComponent;
