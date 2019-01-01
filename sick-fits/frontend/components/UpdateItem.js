import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';
// import formatMoney from '../lib/formatMoney';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            price
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
        updateItem(id: $id, title: $title, description: $description, price: $price) {
            id
            title
            description
            price
        }
    }
`;

class UpdateItem extends Component {
    state = {};

    handleChange = ({ target: { name, type, value } }) => {
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    updateItem = async (e, updateItemMutation) => {
        e.preventDefault();
        const { id } = this.props;
        const res = await updateItemMutation({
            variables: {
                id,
                // We can spread the complete this.state, because our state only contains values that changed
                ...this.state,
            },
        });
    };

    render() {
        const { id } = this.props;
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
                {({ data, loading }) => {
                    if (loading) return <p>Loading...</p>;
                    // If there is no item found, inform the user.
                    if (!data.item) return <p>No Item Found for ID {id}.</p>;
                    return (
                        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                            {(updateItem, { loading, error }) => (
                                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                                    <ErrorMessage error={error} />
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <label htmlFor="title">
                                            Title
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                placeholder="Title"
                                                required
                                                // Fill current data in in input fields, and (only) when they change add them to the state.
                                                defaultValue={data.item.title}
                                                onChange={this.handleChange}
                                            />
                                        </label>

                                        <label htmlFor="price">
                                            Price
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder="Price"
                                                required
                                                defaultValue={data.item.price}
                                                onChange={this.handleChange}
                                            />
                                        </label>

                                        <label htmlFor="description">
                                            Description
                                            <textarea
                                                id="description"
                                                name="description"
                                                placeholder="Enter a description"
                                                required
                                                defaultValue={data.item.description}
                                                onChange={this.handleChange}
                                            />
                                        </label>

                                        <button type="submit">
                                            {/* If loading, display "saving", otherwise use "save" */}
                                            Sav{loading ? 'ing' : 'e'} Changes
                                        </button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
