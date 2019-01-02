const siteData = require('./siteData/metaData/siteMeta.js');

module.exports = {
  siteMetadata: siteData,
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'customers',
        path: `${__dirname}/siteData/customers`,
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
    'gatsby-plugin-page-transitions',
  ],
};
