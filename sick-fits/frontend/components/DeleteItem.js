import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`;

class DeleteItem extends Component {
    update = (cache, payload) => {
        // Manually update cache on the client side when mutation is ready to match the server
        // 1. Read cache for the correct items
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
        // 2. Filter the deleted item out of the page
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        // 3. Put the untouched items back on the page, and leave the deleted one out.
        cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
    };

    render() {
        const { id, children } = this.props;

        return (
            <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={this.update}>
                {(deleteItem, { error }) => (
                    <button
                        type="button"
                        onClick={() => {
                            /* eslint no-alert: 0, no-restricted-globals: 0 */
                            if (confirm('Are you sure you want to delete this item?')) deleteItem();
                        }}
                    >
                        {children}
                    </button>
                )}
            </Mutation>
        );
    }
}

export default DeleteItem;
