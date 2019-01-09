const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// create news listing pages.
// News pages list external news articles. The properties for these news articles
// are stored at data/news/news.json
// as the number of news articles change, pages are generated programmatically
// and a pager is shown
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;


  return new Promise((resolve, reject) => {
    // get the number of news article entries in data/news/news.json
    resolve(
      graphql(
        `
        {
          allNewsJson {
            totalCount
          }
        }
        `
      ).then((result) => {
        if (result.errors) {
          throw result.errors;
        }
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
      })
    );
  });
};
