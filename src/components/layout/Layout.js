import T from 'prop-types';

import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: T.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
