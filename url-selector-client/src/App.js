import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'typeface-roboto'
import Home from './pages/home';
import Admin from './pages/admin';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
