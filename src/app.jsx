import React from 'react';
import Page1 from 'pages/Page1';
import Page2 from 'pages/Page2';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Page1Component = React.lazy(() => import('pages/Page1'));
const Page2Component = React.lazy(() => import('pages/Page2'));

console.log(Page1);

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="page1" component={Page1} />
          <Route exact path="page2" component={Page2} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
