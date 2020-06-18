import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from 'utils/history';

import Frontpage from 'pages/Frontpage'
import Checkout from 'pages/Checkout'
import Confirmation from 'pages/Confirmation'
import Terms from 'pages/Terms'

const App = () => {
    return (
        <Router history={history}>
            <>
                <Switch>
                    <Route exact={true} path="/" component={Frontpage} />
                    <Route exact={true} path="/checkout" component={Checkout} />
                    <Route exact={true} path="/confirmation" component={Confirmation} />
                    <Route exact={true} path="/terms" component={Terms} />
                </Switch>
            </>
        </Router>
    );
}

export default App;
