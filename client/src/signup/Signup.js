import React from 'react';
import axios from 'axios';

import host from '../host';

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        department: '',
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { username, password, department } = this.state
        const registerEndpoint = `${host}/api/register`;
        const loginEndpoint = `${host}/api/login`;

        axios.post(registerEndpoint, { username, password, department })
        .then(res => {
            axios.post(loginEndpoint, { username, password })
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
                this.props.history.push('/users');
            })  
        })  
        .catch(error => {
            this.setState({
                ...error.response.data,
                username: '',
                password: '',
                department: '',
            });
            document.getElementById('signupForm').reset();
        })    
    };

    render() {
        return (
            <>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit} id='signupForm'>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input 
                            name='username' 
                            id='username' 
                            value={this.state.username} 
                            onChange={this.handleInputChange} 
                            type='text'
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            name='password' 
                            id='password' 
                            value={this.state.password} 
                            onChange={this.handleInputChange} 
                            type='password'
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor='department'>Department</label>
                        <select 
                            name='department' 
                            id='department' 
                            value={this.state.department} 
                            onChange={this.handleInputChange} 
                        >
                            <option value=''></option>
                            <option value='HR'>HR</option>
                            <option value='back-end'>back-end</option>
                            <option value='front-end'>front-end</option>
                            <option value='management'>management</option>
                            <option value='marketing'>marketing</option>
                        </select>
                    </div>
                    <div>
                        <button type='submit'>Sign Up</button>
                    </div>
                </form>

                {this.state.errorMessage 
                ? <p>{this.state.errorMessage}</p>
                : null
                }

            </>
        )
    }
}

export default Signup;