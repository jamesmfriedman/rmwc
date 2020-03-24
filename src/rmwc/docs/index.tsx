import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './docstyles';
import { Router } from 'react-router-dom';
import { history } from './history';
import ReactGA from 'react-ga';

import { AppContainer } from 'react-hot-loader';
import App from './app';
// @ts-ignore
import { unregister } from './register-service-worker';
import { RMWCProvider } from '@rmwc/provider';
import { Portal } from '@rmwc/base';

const renderApp = (Component: React.ComponentType<any>) => {
  ReactDOM.render(
    <RMWCProvider>
      <AppContainer>
        <Router history={history}>
          <Component location={window.location.href} />
          <Portal />
        </Router>
      </AppContainer>
    </RMWCProvider>,
    document.getElementById('root')
  );
};

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(['./app'], () => renderApp(App));
}

const initAnalytics = () => {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID as string);
  const doPageView = () =>
    ReactGA.pageview(window.location.pathname + window.location.search);
  history.listen(() => doPageView());
  doPageView();
};

const init = () => {
  renderApp(App);
  initAnalytics();
  unregister();
};

export default init;
