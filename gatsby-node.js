const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;


  const newsPage = path.resolve('./src/pages/news');
  return graphql(
    `
      {
        allNewsJson {
          edges {
            node {
              name_org
              news_org_logo
              news_org_logo_wide
              news_title
              news_url
              news_date
              news_type
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const newsItems = result.data.allFile.edges[0].node.childrenDataJson;

    newsItems.forEach((index) => {
      const previous = index === newsItems.length - 1 ? null : newsItems[index + 1].node;
      const next = index === 0 ? null : newsItems[index - 1].node;

      createPage({
        component: newsPage,
        context: {
          previous,
          next,
        },
      });
    });

    // Create blog post list pages
    const newsItemsPerPage = 9;
    const numPages = Math.ceil(newsItems.length / newsItemsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/' : `/${i + 1}`,
        component: path.resolve('./src/pages/news'),
        context: {
          limit: newsItemsPerPage,
          skip: i * newsItemsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'File') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      node,
      value,
    });
  }
};
