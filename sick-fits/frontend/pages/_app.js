/* eslint-disable react/jsx-props-no-spreading */
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import Router from 'next/router';
import Page from '../components/Page';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
	return (
		<Page>
			<Component {...pageProps} />
		</Page>
	);
}
