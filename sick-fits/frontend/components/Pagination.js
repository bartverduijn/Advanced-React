import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;

const Pagination = ({ page }) => (
    <Query query={PAGINATION_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            const count = data.itemsConnection.aggregate.count;
            const totalPages = Math.ceil(count / perPage);
            return (
                <PaginationStyles>
                    <Head>
                        <title>
                            Sick Fits! - Page {page} of {totalPages}
                        </title>
                    </Head>
                    <Link
                        prefetch
                        href={{
                            pathname: 'items',
                            query: { page: page - 1 },
                        }}
                    >
                        <a className="prev" aria-disabled={page <= 1}>
                            ← Prev
                        </a>
                    </Link>
                    <p>
                        Page {page} of {totalPages}
                    </p>
                    <p>{count} Items Total</p>
                    <Link
                        prefetch
                        href={{
                            pathname: 'items',
                            query: { page: page + 1 },
                        }}
                    >
                        <a className="next" aria-disabled={page >= totalPages}>
                            Next →
                        </a>
                    </Link>
                </PaginationStyles>
            );
        }}
    </Query>
);

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
};

export default Pagination;
