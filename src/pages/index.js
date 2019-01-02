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
import PageTransition from 'gatsby-plugin-page-transitions';
import Layout from '../templates/default';
import PageTitle from '../components/page-title';
import CustomerList from '../components/customer-list';
import Banner from '../components/page-banner';

/* eslint no-undef: 0 */
// eslint-disable-next-line
const HomePage = ({ data }) => {

  // page banner
  // set the banner properties in object literal 'bannerConfic'
  const bannerConfig = {
    title: 'this is a banner title',
    bgImgURL: '/images/banners/home-banner-bg.jpg',
    ctaText: 'Read more here',
    ctaURL: 'https://apple.com',
    fixedBg: true
  };

  // in-page banner
  // set the banner properties in object literal 'bannerConfic'
  const inPageBannerConfig = {
    title: 'this is an in-page banner without a CTA',
    bgImgURL: '/images/banners/in-page-cta.jpg',
    fixedBg: false
  };

  // top message
  // if the local pageToMessage is defined it will be shown. otherwise siteTopMessage will be shown
  const topMessage = {
    pageTopMessage: 'this is the <a href="https://apple.com">page specific</a> top message',
    siteTopMessage: data.site.siteMetadata.topMessage,
  };

  // page title
  // set the page specific page title here, to use site default use  an empty string
  const pageTitle = 'this is page specific page title';

  // enable navigation links
  // navigation links may be hidden to build a "link less" landing page
  const hasLinks = true;

  // if bannerConfig is defined then we do not render a page title, the banner h1 will act as the page title
  // both bannerConfig and topMessage are conditional props. They can be commented above without causing
  // the code to break.
  return (
    <PageTransition>
      <Layout
        {...(typeof bannerConfig !== 'undefined' && { banner: bannerConfig })}
        {...(typeof topMessage !== 'undefined' && { topMessage })}
        hasLinks={hasLinks}
      >
        {!bannerConfig ? <PageTitle headerText={pageTitle} /> : null}

        <div className="container main-content">
          <h2>Inceptos Pellentesque Nibh Lorem</h2>
          <p className="intro">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod.</p>
          <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

          <CustomerList />

          <h2>Maecenas sed diam eget risus varius blandit sit amet non magna.</h2>
          <p>Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla.</p>

          <p>Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>

          <Banner banner={inPageBannerConfig} />

          <h2>Sed posuere consectetur </h2>
          <p>Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>

        </div>
      </Layout>
    </PageTransition>
  );
};

export default HomePage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        topMessage
      }
    }
  }
`;
