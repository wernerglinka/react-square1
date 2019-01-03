/* eslint react/jsx-one-expression-per-line:0 */
/**
 *  HomePage using the default page template
 *  a default page template uses the default layout to implement
 *  - an optional top message band at the very top of the page
 *  - an optional static banner
 *  - a page title that is hidden if the banner is present
 *  - a page footer
 *
 *  the page is wrapped with transition wrapper to implement animated page transitions
 *
 *  the top message may be locally defined or a global message may be used. The global
 *  message is defined in siteData/siteMeta.js
 */

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../templates/default';
import PageTitle from '../components/page-title';
import CustomerList from '../components/customer-list';
import Banner from '../components/page-banner';
import MediaModule from '../components/media-module-vertical';

/* eslint no-undef: 0 */
// eslint-disable-next-line
const HomePage = ({ data }) => {
  // enable navigation links
  // navigation links may be hidden to build a "link less" landing page
  const hasLinks = true;

  // page banner
  // set the banner properties in object literal 'bannerConfic'
  const bannerConfig = {
    title: 'this is a banner title',
    bgImgURL: '/assets/images/banners/home-banner-bg.jpg',
    ctaText: 'Read more here',
    ctaURL: 'https://apple.com',
    fixedBg: true,
    lightText: false
  };

  // in-page banner
  // set the banner properties in object literal 'bannerConfic'
  const inPageBannerConfig = {
    title: 'this is an in-page banner without a CTA',
    bgImgURL: '/assets/images/banners/in-page-cta.jpg',
    fixedBg: false,
    lightText: true
  };

  // top message
  // if the page uses a local pageToMessage defined it here
  // if page uses a site-wide topMessage use "data.site.siteMetadata.topMessage"
  // if no topMessage delete or comment-out this part
  const topMessage = 'this is the <a href="https://apple.com">page specific</a> top message';

  // page title
  // if bannerConfig is defined then we do not render a page title, the banner h1 will act as the page title
  // both bannerConfig and topMessage are conditional props. They can be commented above without causing
  // the code to break.
  const pageTitle = 'this is page specific page title';

  // footer
  // if footer has a background image define it here.
  // if footer should use a site-wide bg image use "data.site.siteMetadata.defaultImages.footer"
  // if no footer img delete or comment-out this part
  const footerBgImg = data.site.siteMetadata.defaultImages.footer;

  // media list
  // this page features a media list
  // the list is defined here
  const mediaList = [
    {
      mediaImgURL: '/assets/images/section-icons/clean-industry.svg',
      mediaTitle: 'Aenean Etiam Fermentum',
      mediaProse: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.'
    },
    {
      mediaImgURL: '/assets/images/section-icons/conserve-energy.svg',
      mediaTitle: 'Condimentum Fringilla',
      mediaProse: 'Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla.'
    },
    {
      mediaImgURL: '/assets/images/section-icons/save-nature.svg',
      mediaTitle: 'Ullamcorper Venenatis Tortor',
      mediaProse: 'Malesuada eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
    },
    {
      mediaImgURL: '/assets/images/section-icons/stop-littering.svg',
      mediaTitle: 'Tellus Dapibus Amet Egestas',
      mediaProse: 'Donec ullamcorper nulla non metus auctor fringilla.'
    }
  ];

  return (

    <Layout
      {...(typeof bannerConfig !== 'undefined' && { banner: bannerConfig })}
      {...(typeof topMessage !== 'undefined' && { topMessage })}
      {...(typeof footerBgImg !== 'undefined' && { footerBgImg })}
      hasLinks={hasLinks}
    >
      {!bannerConfig ? <PageTitle headerText={pageTitle} /> : null}

      <div className="main-content">
        <div className="container">
          <h2>Inceptos Pellentesque Nibh Lorem</h2>
          <p className="intro">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. <a href="#testSec">Cras justo odio</a>, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod.</p>
          <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

          <CustomerList />

          <h2>Maecenas sed diam eget risus varius blandit sit amet non magna.</h2>
          <p>Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla.</p>

          <p>Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
        </div>

        <Banner banner={inPageBannerConfig} />

        <div className="container" id="testSec">
          <h2>Sed posuere consectetur </h2>
          <p>Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>

          <ul className="media-list_horizontal">
            {mediaList.map(listItem => (
              <li key={listItem.mediaTitle}>
                <MediaModule content={listItem} />
              </li>
            ))}
          </ul>

        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        topMessage
        defaultImages {
          footer
        }
      }
    }
  }
`;
