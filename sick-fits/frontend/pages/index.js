import Items from '../components/Items';

const Home = ({ query }) => <Items page={parseFloat(query.page) || 1} />; // If no ?page= in url, return 1 instead of NaN

export default Home;
