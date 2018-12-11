const axios = require('axios');
const _ = require('lodash');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest}, configOptions) => {
  const { createNode } = actions;
  const instance = axios.create({
    baseURL: `https://api.unsplash.com/`,
    headers: {
      'Authorization': `Client-ID ${configOptions.accessKey}`,
    },
  });

  const collectionUrl = `collections/${configOptions.collectionId}/photos`;

  return (
    instance.get(collectionUrl).then(res => {
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
