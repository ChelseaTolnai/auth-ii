import React from 'react';
import axios from 'axios';

import host from '../host';

class Users extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        const usersEndpoint = `${host}/api/users`;
        const token = localStorage.getItem('jwt');
        const reqOptions = {
            headers: {
                authorization: token,
            }
        };

        axios.get(usersEndpoint, reqOptions)
        .then(res => {
            this.setState({ users: res.data.users })
        })
        .catch(error => {
            this.setState({
                ...error.response.data,
                users: [],
            });
        });
    }

    render() {
        return (
            <>
                <h2>Users</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Department</th> 
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.users.map(user => 
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.department}</td>
                        </tr>
                        )}
                    </tbody>

                </table>

                {this.state.errorMessage 
                ? <p>{this.state.errorMessage}</p>
                : null
                }

            </>
        )
    }
}

export default Users;