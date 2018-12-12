const axios = require('axios');
const _assign = require('lodash/assign');
const image2base64 = require('image-to-base64');

const NODE_TYPENAME = `UnsplashPhoto`;

exports.onPreInit = () => {
  if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest}) => {
  const accessKey = process.env.UNSPLASH_ACCESS;
  const collectionUri = `collections/${process.env.UNSPLASH_COLLECTION}/photos`;
  const instance = axios.create({
    baseURL: `https://api.unsplash.com/`,
    headers: {
      'Authorization': `Client-ID ${accessKey}`,
    },
  });

  return instance.get(collectionUri)
    .then(res => res.data.map(photo => {
      actions.createNode(_assign({}, photo, {
        id: createNodeId(`unsplash-photo-${photo.id}`),
        parent: null,
        children: [],
        internal: {
          type: NODE_TYPENAME,
          contentDigest: createContentDigest(photo),
        },
      }))
    }));
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  // Get the thumbnail image for the node (photo) and
  // create a field width the base64 encoding of that image.
  if (node.internal.type === NODE_TYPENAME) {
    return axios.get(node.urls.thumb, { responseType: 'arraybuffer' })
      .then(res => createNodeField({
        node,
        name: `encodedPhotoThumb`,
        value: Buffer.from(res.data, 'binary').toString('base64'),
      }));
    // return image2base64(node.urls.thumb)
    //   .then(res => createNodeField({
    //     node,
    //     name: `encodedPhotoThumb`,
    //     value: res,
    //   }));
  }
};