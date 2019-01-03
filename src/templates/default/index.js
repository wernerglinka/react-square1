import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from '../../components/page-top-message';
import NavBar from '../../components/nav-bar';
import Banner from '../../components/page-banner';
import Footer from '../../components/page-footer';
import './global-styles/main.scss';

/**
 * default page template with main navigation, optional banner and footer
 * note that all layoput styles are define globally in static/global-styles.scss
 */
const DefaultLayout = ({
  topMessage, banner, footerBgImg, hasLinks, children
}) => (
  <div>

    { topMessage ? <TopMessage topMessage={topMessage} /> : null }

    <div className="highlight_full-width navbar-wrapper">
      <NavBar hasLinks={hasLinks} />
    </div>


    { banner ? <Banner banner={banner} /> : null }

    {children}

    <div className="highlight_full-width navbar-wrapper">
      <Footer hasLinks={hasLinks} footerBgImg={footerBgImg} />
    </div>
  </div>
);

DefaultLayout.defaultProps = {
  topMessage: null,
  banner: null,
  footerBgImg: null,
  hasLinks: null
};

DefaultLayout.propTypes = {
  topMessage: PropTypes.string,
  // eslint-disable-next-line
  banner: PropTypes.object,
  // eslint-disable-next-line
  footerBgImg: PropTypes.string,
  hasLinks: PropTypes.bool,
  // eslint-disable-next-line
  children: PropTypes.array.isRequired
};

export default DefaultLayout;
