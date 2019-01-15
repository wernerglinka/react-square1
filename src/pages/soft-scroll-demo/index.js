/* eslint react/jsx-one-expression-per-line:0 */

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Link as ScollLink } from 'react-scroll';
import Waypoint from 'react-waypoint';
import Fade from 'react-reveal/Fade';
import InPageNav from '../../components/in-page-nav';
import Layout from '../../templates/default';

const SmoothLink = (props) => {
  const { to, children } = props;
  return (
    <ScollLink
      activeClass="active"
      to={to}
      spy
      smooth
      offset={-70}
      duration={500}
    >
      {children}
    </ScollLink>
  );
};

SmoothLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};


class DemoScrollPage extends React.Component {
  // top message
  // if the page uses a local pageToMessage defined it here
  // if page uses a site-wide topMessage use "data.site.siteMetadata.topMessage"
  // if no topMessage delete or comment-out this part
  // eslint-disable-next-line
  topMessage = this.props.data.site.siteMetadata.topMessage;

  // enable navigation links
  // navigation links may be hidden to build a "link less" landing page
  hasLinks = true;

  // target IDs for the inPageNav
  inPageTargets = ['section1', 'section2', 'section3', 'section4', 'section5'];

  constructor(props) {
    super(props);
    this.state = {
      stickyNav: false
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      // check if page is scrolled down after reload and invoke waypoint if necessary
      const offset = window.pageYOffset;
      if (offset > 260) {
        this.setState(() => ({ stickyNav: true }));
      }
    }, 500);
  }

  handleWaypointEnter = () => {
    this.setState(() => ({ stickyNav: false }));
  };

  handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: true }));
  };

  render() {
    const { stickyNav } = this.state;

    return (
      <Layout topMessage={this.topMessage} hasLinks={this.hasLinks}>

        <div className="main-content">
          <div className="container">

            <Waypoint
              onEnter={this.handleWaypointEnter}
              onLeave={this.handleWaypointLeave}
            />

            <div className="center-elements">
              <InPageNav targets={this.inPageTargets} sticky={stickyNav} />
            </div>

            <Fade bottom>
              <section id="section1">
                <h1>Section 1</h1>
                <p className="intro">This page uses an in-page menu that provides in-page navigation to sections below. All scrolls are smooth scrolls. When the in-page menu is about to scroll out of the viewport, it is fixed to the upper part of the page. At about the same time a <strong>to-top</strong> button is shown in the lower right corner of the viewport. This button will smooth scroll the page to top when clicked. The <strong>react-scroll</strong> plugin is used to implement the smooth scroll action and the <strong>react-waypoint</strong> plugin is used to implement the sticky menu action.
                    The waypoint plugin does not trigger when the browser reloads the page and the page was scrolled down. To insure proper sticky menu action, we check <em>window.pageYOffset</em> in the lifecycle method <strong>componentDidUpdate()</strong> and call <strong>handleWaypointLeave()</strong> if necessary. Apparently, the browser does not update the page offset right when the method is invoked so we use a slight delay to wait for the value!
                </p>

                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod.

                    Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Donec id elit non mi porta gravida at eget metus.
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </section>

              <section id="section2">
                <h1>Section 2</h1>
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod.

                    Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Donec id elit non mi porta gravida at eget metus.
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </section>

              <section id="section3">
                <h1>Section 3</h1>
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod.

                    Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Donec id elit non mi porta gravida at eget metus.
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </section>

              <section id="section4">
                <h1>Section 4</h1>
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod.

                    Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id <SmoothLink to="section1">Section 1</SmoothLink> nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Donec id elit non mi porta gravida at eget metus.
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </section>


              <section id="section5">
                <h1>Section 5</h1>
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod.

                    Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Donec id elit non mi porta gravida at eget metus.
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </section>
            </Fade>
          </div>
        </div>
      </Layout>
    );
  }
}

export default DemoScrollPage;

/**
 * query for page data
 */
export const query = graphql`
  query {
    site {
      siteMetadata {
        topMessage
      }
    }
  }
`;
