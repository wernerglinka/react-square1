/* eslint react/jsx-one-expression-per-line:0, react/self-closing-comp: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { animateScroll } from 'react-scroll';
import TopMessage from '../../components/page-top-message';
import NavBar from '../../components/nav-bar';
import Banner from '../../components/page-banner';
import Footer from '../../components/page-footer';
import './global-styles/main.scss';

/**
 * default page template with main navigation, optional banner and footer
 * note that all layoput styles are define globally in static/global-styles.scss
 */
class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyMainNav: false,
      toTopVisible: false
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      // check if page is scrolled down after reload and invoke waypoint if necessary
      const offset = window.pageYOffset;
      if (offset > 260) {
        this.setState(() => ({ toTopVisible: true }));
      }
      if (offset > 79) {
        this.setState(() => ({ stickyMainNav: true }));
      }
    }, 500);
  }

  hideToTopButton = () => {
    this.setState(() => ({ toTopVisible: false }));
  };

  showToTopButton = () => {
    this.setState(() => ({ toTopVisible: true }));
  };

  makeNavFixed = () => {
    this.setState(() => ({ stickyMainNav: true }));
  };

  makeNavStatic = () => {
    this.setState(() => ({ stickyMainNav: false }));
  };

  scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  render() {
    const {
      topMessage, banner, footerBgImg, hasLinks, children
    } = this.props;

    const { toTopVisible } = this.state;
    const { stickyMainNav } = this.state;

    return (
      <div className="layout-wrapper">

        { topMessage && <TopMessage topMessage={topMessage} /> }

        <div className="highlight_full-width">
          <NavBar hasLinks={hasLinks} isSticky={stickyMainNav} />
        </div>

        {/* waypoint for sticky nav */}
        <Waypoint
          topOffset={80}
          onEnter={this.makeNavFixed}
          onLeave={this.makeNavStatic}
        />

        { banner ? <Banner banner={banner} /> : null }

        {/* waypoint for to top botton */}
        <Waypoint
          scrollableAncestor={window}
          onEnter={this.hideToTopButton}
          onLeave={this.showToTopButton}
        />

        {children}

        <div className="highlight_full-width navbar-wrapper">
          <Footer hasLinks={hasLinks} footerBgImg={footerBgImg} />
        </div>

        <button className={`to-top ${toTopVisible ? 'isVisible' : ''}`} type="button" onClick={this.scrollToTop}><i className="icon icon-arrow-up"></i></button>
      </div>
    );
  }
}

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
  children: PropTypes.object.isRequired
};

export default DefaultLayout;
