import React, { useState } from 'react';
import axios from 'utils/axios';
import history from 'utils/history';
import klarnaOrderCreateBody from 'static/klarnaOrderCreateBody';
import klarnaOrderUpdateBody from 'static/klarnaOrderUpdateBody';
import { useDispatch } from 'react-redux';

export default () => {
    const [orderId, setOrderId] = useState('');
    const dispatch = useDispatch();

    const onCheckoutClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/checkout/v3/orders', klarnaOrderCreateBody, {
                auth: {
                    username: process.env.REACT_APP_KLARNA_USERNAME,
                    password: process.env.REACT_APP_KLARNA_PASSWORD
                }
            });
            // Send a request to active cart to add/update the order_id.
            dispatch({ type: 'CHECKOUT_REQUEST', payload: response.data });
            history.push('/checkout');
        } catch (err) {
            console.log(err);
        }
    }

    const onOrderSubmit = async (e) => {
        e.preventDefault();
        if (orderId.length) {
            try {
                const response = await axios.post(`/checkout/v3/orders/${orderId}`, klarnaOrderUpdateBody, {
                    auth: {
                        username: process.env.REACT_APP_KLARNA_USERNAME,
                        password: process.env.REACT_APP_KLARNA_PASSWORD
                    }
                });

                dispatch({ type: 'CHECKOUT_REQUEST', payload: response.data });
                history.push('/checkout');
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Frontpage</h1>
            <button onClick={onCheckoutClick}>Proceed to checkout</button>
            <br />
            <br />
            <h3>Update an exisiting order</h3>
            <form onSubmit={onOrderSubmit}>
                <input type="text" value={orderId} onChange={e => setOrderId(e.target.value)} />
                <button>Update</button>
            </form>
        </div>
    )
}