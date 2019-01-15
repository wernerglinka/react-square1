/* eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/

import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../../templates/default';
import SEO from '../../components/seo';
import { rhythm } from '../../utilities/typography';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;

    // enable navigation links
    // navigation links may be hidden to build a "link less" landing page
    const hasLinks = true;

    // page banner
    // set the banner properties in object literal 'bannerConfic'
    const bannerConfig = {
      title: 'Blog',
      bgImgURL: '/assets/images/blog/blog.jpg',
      ctaText: '',
      ctaURL: '',
      fixedBg: false,
      lightText: true
    };

    // top message
    // if the page uses a local pageToMessage defined it here
    // if page uses a site-wide topMessage use "data.site.siteMetadata.topMessage"
    // if no topMessage delete or comment-out this part
    const topMessage = 'this is the <a href="https://apple.com">page specific</a> top message';


    // footer
    // if footer has a background image define it here.
    // if footer should use a site-wide bg image use "data.site.siteMetadata.defaultImages.footer"
    // if no footer img delete or comment-out this part
    // footerBgImg = this.props.data.site.siteMetadata.defaultImages.footer;
    const { data: { site: { siteMetadata: { defaultImages: { footer: footerBgImg } } } } } = this.props;

    return (
      <Layout
        banner={bannerConfig}
        topMessage={topMessage}
        footerBgImg={footerBgImg}
        hasLinks={hasLinks}
      >
        <SEO
          title="All posts"
          keywords={['blog', 'gatsby', 'javascript', 'react']}
        />

        <div className="main-content">
          <div className="container">

            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <div key={node.fields.slug}>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                  <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                </div>
              );
            })}

          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        topMessage
        defaultImages {
          footer
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
