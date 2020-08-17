import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const IndexPage = React.lazy(() => import('pages/IndexPage'));
const Page1 = React.lazy(() => import('pages/Page1'));
const Page2 = React.lazy(() => import('pages/Page2'));
const Page404 = React.lazy(() => import('pages/Page404'));

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={(props) => <IndexPage {...props} />} />
            <Route exact path="/page1" component={(props) => <Page1 {...props} />} />
            <Route exact path="/page2" component={(props) => <Page2 {...props} />} />
            <Route path="/404" component={(props) => <Page404 {...props} />} />
            <Redirect to="/404" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
export default App;
