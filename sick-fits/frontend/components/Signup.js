import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`;

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
                {(signup, { error, loading }) => (
                    <Form
                        method="post"
                        onSubmit={async e => {
                            e.preventDefault();
                            await signup();
                            return this.setState({ name: '', password: '', email: '' });
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign Up for an Account</h2>

                            <ErrorMessage error={error} />

                            <label htmlFor="email">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="johndoe@gmail.com"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={this.state.name}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password123"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

Signup.propTypes = {};

export default Signup;
