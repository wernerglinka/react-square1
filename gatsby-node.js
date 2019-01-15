const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// create news listing pages.
// News pages list external news articles. The properties for these news articles
// are stored at data/news/news.json
// as the number of news articles change, pages are generated programmatically
// and a pager is shown
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve('./src/templates/blog-post.js');

  return new Promise((resolve, reject) => {
    // get the number of news article entries in data/news/news.json
    resolve(
      graphql(
        `
        {
          allNewsJson {
            totalCount
          }
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
        `
      ).then((result) => {
        if (result.errors) {
          throw result.errors;
        }

        /**
         * section for creating news lists
         */
        // destructure totalCount variable from result object
        const { data: { allNewsJson: { totalCount } } } = result;

        // Create the news list pages
        const newsItemsPerPage = 6;
        const numPages = Math.ceil(totalCount / newsItemsPerPage);

        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? '/news' : `/news/${i}`,
            component: path.resolve('./src/templates/news-list/index.js'),
            context: {
              limit: newsItemsPerPage,
              skip: i * newsItemsPerPage,
              numPages,
              currentPage: i + 1
            },
          });
        });

        /**
         * section for blogposts
         */
        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach((post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};
