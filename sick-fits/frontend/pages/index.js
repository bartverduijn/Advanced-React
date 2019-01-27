import PropTypes from 'prop-types';
import Items from '../components/Items';

const Home = ({ query: { page } }) => <Items page={parseFloat(page) || 1} />; // If no ?page= in url, return 1 instead of NaN

Home.propTypes = {
    query: PropTypes.shape({
        page: PropTypes.string,
    }),
};

export default Home;
