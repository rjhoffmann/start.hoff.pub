const axios = require('axios');
const _ = require('lodash');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest}) => {
  if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  const accessKey = process.env.UNSPLASH_ACCESS;
  const collectionId = process.env.UNSPLASH_COLLECTION;

  const { createNode } = actions;
  const instance = axios.create({
    baseURL: `https://api.unsplash.com/`,
    headers: {
      'Authorization': `Client-ID ${accessKey}`,
    },
  });

  return (
    instance.get(`collections/${collectionId}/photos`).then(res => {
      _.forEach(res.data, photo => {
        createNode(_.assign({}, photo, {
          id: createNodeId(`unsplash-photo-${photo.id}`),
          parent: null,
          children: [],
          internal: {
            type: `UnsplashPhoto`,
            content: JSON.stringify(photo),
            contentDigest: createContentDigest(photo),
          },
        }));
      });
    })
  );
};