import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0,
    };

    // Use arrow function so I can still use 'this' without binding the function to 'this'
    // Destructure e.target immediately
    handleChange = ({ target: { name, type, value } }) => {
        // For a number input, parse the input to a float instead of a string
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    uploadFile = async ({ target: { files } }) => {
        const data = new FormData();
        // Append file and cloudinary preset to FormData
        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');
        // Post image to cloudinary
        const res = await fetch('https://api.cloudinary.com/v1_1/dibvasvit/image/upload', {
            method: 'POST',
            body: data,
        });
        // Await the response of the POST request
        const file = await res.json();
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url,
        });
    };

    render() {
        const { image, title, price, description } = this.state;
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {/* <Mutation> can only take in a function, thus expose createItem to Form */}
                {(createItem, { loading, error }) => (
                    <Form
                        onSubmit={async e => {
                            // Stop form from submitting and don't store data in URL
                            e.preventDefault();
                            // Call mutation createItem
                            const res = await createItem();
                            // Change route to Item page
                            Router.push({
                                pathname: '/item',
                                query: { id: res.data.createItem.id },
                            });
                        }}
                    >
                        {/* If there is an error, render error message */}
                        <ErrorMessage error={error} />
                        {/* Disable form if in loading state */}
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="file">
                                Image
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    placeholder="Upload an image"
                                    onChange={this.uploadFile}
                                />
                                {image && <img src={image} alt="Upload preview" width="200" />}
                            </label>

                            <label htmlFor="title">
                                Title
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    required
                                    value={title}
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
                                    value={price}
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
                                    value={description}
                                    onChange={this.handleChange}
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

export default CreateItem;
export { CREATE_ITEM_MUTATION };
