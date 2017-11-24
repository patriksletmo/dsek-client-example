import React, {Component} from 'react';
import './App.css';
import LoginTest from "./LoginTest";
import {BASE_URL} from "./config";

const Cookies = require('js-cookie');

class App extends Component {
    render() {
        let loginUrl = BASE_URL + "/account/token?redirect=" + window.location.href;
        let token = Cookies.get('token');

        let content;
        if (token !== undefined) {
            content = (
                <LoginTest />
            );
        } else {
            content = (
                <p>
                    Testa funktionaliteten genom att <a href={loginUrl}>logga in</a>.
                </p>
            );
        }

        return (
            <div className="App">
                <p className="App-intro">
                    {content}
                </p>
            </div>
        );
    }
}

export default App;
