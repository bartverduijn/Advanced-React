import PropTypes from 'prop-types';
import Head from 'next/head';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            largeImage
        }
    }
`;

const SingleItemStyled = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`;

const SingleItem = ({ id }) => (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({ error, loading, data: { item } }) => {
            if (error) return <ErrorMessage error={error} />;
            if (loading) return <p>Loading...</p>;
            // If a there is a unknown id passed, we handle it client side. (Can also be done serverside in a custom resolver)
            if (!item) return <p>No Item Found for {id}</p>;

            return (
                <SingleItemStyled>
                    {/* Next allows you to have multiple Head tags in your application, and pulls them together */}
                    <Head>
                        <title>Sick Fits! | {item.title} </title>
                    </Head>
                    <img src={item.largeImage} alt={item.title} />
                    <div className="details">
                        <h2>Viewing {item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                </SingleItemStyled>
            );
        }}
    </Query>
);

SingleItem.propTypes = {
    id: PropTypes.string.isRequired,
};

export default SingleItem;
