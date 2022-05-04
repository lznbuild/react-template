import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { routeList } from './common/config';
import BreadCrumb from './components/BreadCrumb';

import './index.css';
// const IndexPage = React.lazy(() => import('pages/IndexPage'));
// const Page1 = React.lazy(() => import('pages/Page1'));
// const Page2 = React.lazy(() => import('pages/Page2'));
// const Page404 = React.lazy(() => import('pages/Page404'));

/** 获取banner信息 */
async function fetchBannerList() {
  const res = await axios.get('/rest/default');
  console.log(res, 'res');
  return res.data;
}

class App extends React.Component {
  componentDidMount() {
    fetchBannerList();
  }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <BreadCrumb />
          {/* <Switch>
            <Route exact path="/" component={(props) => <IndexPage {...props} />} />
            <Route exact path="/page1" component={(props) => <Page1 {...props} />} />
            <Route exact path="/page2" component={(props) => <Page2 {...props} />} />
            <Route path="/404" component={(props) => <Page404 {...props} />} />
            <Redirect to="/404" />
          </Switch> */}

          <Switch location={location}>
            {routeList.map((item) => (
              <Route
                exact
                strict
                key={item.path}
                path={item.path}
                render={(routeProps) => (
                  <div className="page-container">
                    <item.component {...routeProps} />
                  </div>
                )}
              />
            ))}
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
export default App;
