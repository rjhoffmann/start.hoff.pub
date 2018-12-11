require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `start`,
    siteUrl: `https://start.hoff.pub`,
    description: `startpage`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: `gatsby-source-unsplash_color`,
      options: {
        accessKey: process.env.UNSPLASH_ACCESS,
        collectionId: process.env.UNSPLASH_COLLECTION,
      },
    },
  ],
};
