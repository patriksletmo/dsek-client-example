import React, {Component} from 'react';
import {BASE_URL} from "./config";

const Cookies = require('js-cookie');


class LoginTest extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};

        this.success = this.success.bind(this);
        this.failure = this.failure.bind(this);
    }

    componentDidMount() {
        let url = BASE_URL + "/account/user/me/";
        let token = Cookies.get('token');

        fetch(url, {
            headers: new Headers({
                "Authorization": "JWT " + token
            })
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }

            throw new Error('Network response was not ok.');
        }).then(this.success)
          .catch(this.failure);
    }

    success(data) {
        this.setState({
            loading: false,
            success: true,
            data: data
        });
    }

    failure() {
        this.setState({
            loading: false,
            success: false
        });
    }

    static logout() {
        Cookies.remove('token');
        window.location.reload();
    }

    render() {
        if (this.state.loading) {
            return (
                <p>
                    Laddar...
                </p>
            );
        } else {
            if (this.state.success) {
                let groups = this.state.data.groups.map(function (group, i) {
                    return (
                        <span key={i}>
                            {!!i && ", "}
                            {group.name}
                        </span>
                    )
                });

                return (
                    <p>
                        Användarnamn: {this.state.data.username}
                        <br/>
                        Grupper: {groups}
                        <br/>
                        <a href="#" onClick={LoginTest.logout}>Logga ut</a>
                    </p>
                );
            } else {
                return (
                    <p>
                        Ogiltigt token (<a href="#" onClick={LoginTest.logout}>logga ut?</a>)
                    </p>
                );
            }
        }

    }
}

export default LoginTest;
