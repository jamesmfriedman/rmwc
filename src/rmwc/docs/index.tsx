import React from 'react';
import * as ReactDOM from 'react-dom';
import './styles';
import { Router } from 'react-router-dom';
import { history } from './common/history';
import ReactGA from 'react-ga';
import App from './views/app';
import { RMWCProvider } from '@rmwc/provider';

const renderApp = (Component: React.ComponentType<any>) => {
  ReactDOM.render(
    <RMWCProvider>
      <Router history={history}>
        <Component location={window.location.href} />
      </Router>
    </RMWCProvider>,
    document.getElementById('root')
  );
};

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(['./views/app'], () => renderApp(App));
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
};

export default init;
