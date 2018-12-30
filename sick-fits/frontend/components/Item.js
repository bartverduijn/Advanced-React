import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

/* eslint react/prefer-stateless-function: 0, react/forbid-prop-types: 0 */
class Item extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    };

    render() {
        const { item } = this.props;
        return (
            <ItemStyles>
                {/* Only use image when there is one in the db */}
                {item.image && <img src={item.image} alt={item.title} />}

                <Title>
                    <Link href={{ pathname: '/item', query: { id: item.id } }}>
                        <a>{item.title}</a>
                    </Link>
                </Title>

                <PriceTag>{formatMoney(item.price)}</PriceTag>

                <p>{item.description}</p>

                <div className="buttonList">
                    <Link href={{ pathname: 'update', query: { id: item.id } }}>
                        <a>
                            Edit{' '}
                            <span role="img" aria-label="pencil">
                                ✏️
                            </span>
                        </a>
                    </Link>

                    <button type="button">Add To Cart</button>
                    <button type="button">Delete</button>
                </div>
            </ItemStyles>
        );
    }
}

export default Item;