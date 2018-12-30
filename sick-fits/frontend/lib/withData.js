import withApollo from 'next-with-apollo'; // Expose Apollo as a prop in Next.js
import ApolloClient from 'apollo-boost'; // Recommended preset of Apollo packages
import { endpoint } from '../config'; // Location of our API

function createClient({ headers }) {
    return new ApolloClient({
        uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
        request: operation => {
            operation.setContext({
                // Bring credential cookies with every request
                fetchOptions: { credentials: 'include' },
                headers,
            });
        },
    });
}

export default withApollo(createClient);
