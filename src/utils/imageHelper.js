// Modified from https://github.com/sambernard/react-preload/blob/master/modules/ImageHelper.js

import imageCache from './imageCache';

const reflect = p => p.then(v => ({v, status: 'fulfilled' }),
                            e => ({e, status: 'rejected' }));

const imageHelper = {
  loadImage: (url, options) => {
    const image = imageCache.get(url, options);

    return new Promise((resolve, reject) => {
      const handleSuccess = () => resolve(image);
      const handleError = () => reject(new Error(`failed to preload ${url}`));

      if (image.complete) {
        if (image.naturalWidth && image.naturalHeight) {
          handleSuccess();
        } else {
          // IE CACHED IMAGES RACE CONDITION
          // -------------------------------
          // IE11 sometimes reports cached images as image.complete,
          // but naturalWidth and naturalHeight = 0.
          // A few ms later it will get the dimensions correct,
          // so check a few times before rejecting it.

          let counter = 1;
          const checkDimensions = setInterval(() => {
            if (image.naturalWidth && image.naturalHeight) {
              window.clearInterval(checkDimensions);
              handleSuccess();
            }
            if (counter === 3) {
              window.clearInterval(checkDimensions);
              handleError();
            }
            counter += 1;
          }, 50);
        }
      }
    });
  },
};
