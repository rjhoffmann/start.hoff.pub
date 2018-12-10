import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: process.env.UNSPLASH_ACCESS,
  secret: process.env.UNSPLASH_SECRET,
  callbackUrl: `localhost:8000`,
});

export const authUrl = unsplash.auth.getAuthenticationUrl([
  'public',
  'read_collections',
]);

export default unsplash;
