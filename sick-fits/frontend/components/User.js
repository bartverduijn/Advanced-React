import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
            email
            name
            permissions
        }
    }
`;

// Pass all props of parent component through to child component, and add the query to it
const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload => props.children(payload)}
    </Query>
);

// Make sure you can only pass a function, just like apollo's query component
User.propTypes = {
    children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
