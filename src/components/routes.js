import React from 'react';
import {
    Router,
    Route
} from 'react-router-dom';
import "../index.css";
import SignInPage from "./Signin"
import SignUpPage from "./Signup"
import Home from "./home"
import ChatInput from "./chat"
import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory();

const MyRoutes = () => (
    <Router history={customHistory}>
        <div>
            <Route exact path="/" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/home" component={Home} />
            <Route path="/chat" component={ChatInput}/>
        </div>
    </Router>
)

export default MyRoutes;