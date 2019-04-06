import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

class Signin extends Component {
    state = {
        email: '',
        password: '',
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                // automatically refetch current user when signed in
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signin, { error, loading }) => (
                    <Form
                        method="post"
                        onSubmit={async e => {
                            e.preventDefault();
                            await signin();
                            return this.setState({ password: '', email: '' });
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign In</h2>

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

Signin.propTypes = {};

export default Signin;
