import React from 'react';
import TopMessage from '../../components/page-top-message';
import NavBar from '../../components/nav-bar';
import Banner from '../../components/page-banner';
import Footer from '../../components/page-footer';
import '../../../static/global-styles.scss';

/**
 * default page template with main navigation, optional banner and footer
 * note that all layoput styles are define globally in static/global-styles.scss
 */
const DefaultLayout = ({
  topMessage, banner, hasLinks, children
}) => (
  <div>

    { topMessage ? <TopMessage topMessage={topMessage} /> : null }

    <div className="highlight_full-width navbar-wrapper">
      <NavBar hasLinks={hasLinks} />
    </div>


    { banner ? <Banner banner={banner} /> : null }

    {children}

    <div className="highlight_full-width navbar-wrapper">
      <Footer hasLinks={hasLinks} />
    </div>
  </div>
);

export default DefaultLayout;
