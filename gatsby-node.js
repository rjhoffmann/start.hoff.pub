const fs = require('fs');
const download = require('download');
const axios = require('axios');
const _foreach = require('lodash/forEach');
const _assign = require('lodash/assign');
const _map = require('lodash/map');

exports.onPreInit = () => {
  if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest}) => {
  const accessKey = process.env.UNSPLASH_ACCESS;
  const collectionId = process.env.UNSPLASH_COLLECTION;

  const instance = axios.create({
    baseURL: `https://api.unsplash.com/`,
    headers: {
      'Authorization': `Client-ID ${accessKey}`,
    },
  });

  return (
    instance.get(`collections/${collectionId}/photos`).then(res => {
      // TODO: Download photo to static, utilize gatsby photo engine to
      // ensure faster image loads or something like that.

      // for (const photo of res.data) {
      //   // Triggering a download on Unsplash for tracking purposes.
      //   instance.get(photo.download_location);

      //   download(photo.urls.raw).then(rawPhoto => {
      //     fs.writeFileSync(`static/${photo.id}.jpg`)
      //   })
      // }
      
      _foreach(res.data, photo => {
        actions.createNode(_assign({}, photo, {
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