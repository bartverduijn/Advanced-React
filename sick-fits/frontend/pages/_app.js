import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import Page from '../components/Page';
import withData from '../lib/withData';

class MyApp extends App {
    // To handle page numbers in URI (eg /items?page=1) => Crawl all pages and fetch/return all data
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        // If Component I'm trying to render has some props
        if (Component.getInitialProps) {
            // Serve them via the pageProps
            pageProps = await Component.getInitialProps(ctx);
        }
        // To expose query to the user
        pageProps.query = ctx.query;
        return pageProps;
    }

    render() {
        const { Component, apollo, pageProps } = this.props;

        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </ApolloProvider>
            </Container>
        );
    }
}

export default withData(MyApp); // Wrapped in higher-order component to make this.props.apollo available
