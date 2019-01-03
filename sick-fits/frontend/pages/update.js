import PropTypes from 'prop-types';
import UpdateItem from '../components/UpdateItem';

const Sell = ({ query: { id } }) => <UpdateItem id={id} />;

Sell.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default Sell;
