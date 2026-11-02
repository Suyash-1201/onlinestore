import React, { useEffect, useState } from 'react';
import '../css/orderpage.css';
import Pagewrapper from './Pagewrapper';
import { motion } from 'framer-motion';
import axios from 'axios';
import Api from '../Api';

const Orderspage = () => {
    const [prod, setprod] = useState([]);
    const [items, setitems] = useState([]);
    const [user, setuser] = useState({ payfor: 'user' });

    const num = Number(localStorage.getItem('number'));

    useEffect(() => {
        async function finduser() {
            try {
                const res = await Api.get(
                    `/user/getpremiumuser/${num}`
                );
                setuser(res.data ?? { payfor: 'user' });
            } catch (error) {
                console.error('User fetch error:', error);
                setuser({ payfor: 'user' });
            }
        }

        if (num) finduser();
    }, [num]);

    useEffect(() => {
        async function fetchprod() {
            try {
                const res = await axios.get(
                    'https://dummyjson.com/products'
                );
                setprod(res.data.products);
            } catch (error) {
                console.error('Product fetch error:', error);
            }
        }

        fetchprod();
    }, []);

    useEffect(() => {
        async function fetchitems() {
            try {
                const res = await Api.get(
                    `/user/getorders/${num}`
                );

                setitems(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error('Order items fetch error:', error);
                setitems([]);
            }
        }

        if (num) fetchitems();
    }, [num]);

    const filterprod = prod.filter(product =>
        items.some(
            orderItem =>
                Number(orderItem.prodid) === Number(product.id)
        )
    );

    return (
        <Pagewrapper>
            <div className="orders-page-wrapper">
                <div className="orders-header">
                    <h2>My Orders</h2>
                    <p>Track, manage, and view your past orders</p>
                </div>

                <div className="orders-container">
                    {filterprod.map(item => {
                        const orderItem = items.find(
                            i => Number(i.prodid) === Number(item.id)
                        );

                        const quantity = Number(orderItem?.stock ?? 1);
                        const basePrice = Math.ceil(item.price * 30);

                        const discount =
                            user?.payfor === 'premiumuser'
                                ? Math.ceil(item.discountPercentage + 40)
                                : Math.ceil(item.discountPercentage);

                        const price =
                            Math.ceil(
                                basePrice - (basePrice * discount) / 100
                            ) * quantity;

                        const isDelivered = orderItem?.status ? orderItem.status === 'Delivered' : true;
                        const deliveryText = isDelivered ? 'Delivered on Oct 18' : 'Estimated: Oct 28';

                        return (
                            <motion.div
                                key={item.id}
                                className="order-card"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: 'easeOut'
                                }}
                            >
                                <div className="order-image-wrapper">
                                    <img
                                        src={item.images?.[0]}
                                        alt={item.title}
                                    />
                                </div>

                                <div className="order-info">
                                    <div className="order-meta-top">
                                        <span className="order-brand">{item.brand}</span>
                                        <span className={`status-badge ${isDelivered ? 'delivered' : 'pending'}`}>
                                            {deliveryText}
                                        </span>
                                    </div>

                                    <h3 className="order-title">{item.title}</h3>

                                    <div className="order-footer">
                                        <div className="order-price-qty">
                                            <span className="order-price">&#8377;{price.toLocaleString('en-IN')}</span>
                                            <span className="order-qty">Qty: {quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {prod.length > 0 && items.length === 0 && (
                        <div className="empty-state">
                            <p>No order items found.</p>
                        </div>
                    )}

                    {prod.length > 0 &&
                        items.length > 0 &&
                        filterprod.length === 0 && (
                            <div className="empty-state">
                                <p>No matching products found.</p>
                            </div>
                        )}
                </div>
            </div>
        </Pagewrapper>
    );
};

export default Orderspage;