const siteData = require('./data/site');

module.exports = {
  siteMetadata: siteData,
  plugins: [
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src`,
      }
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utilities/typography.js',
      }
    },
    'gatsby-plugin-sass',
  ],
};
