import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { DataContext } from '../../components/dataProvider/DataProvider';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utility/firebase';
import classes from './Orders.module.css';
import ProductSlice from '../../components/Product/ProductSlice';
import { collection, doc, query, orderBy, onSnapshot } from 'firebase/firestore';

const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      // If no user, redirect to the login page and set redirect path
      localStorage.setItem('redirectAfterLogin', '/orders');
      navigate('/auth', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(doc(collection(db, "users"), user.uid), "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })));
    });

    return () => unsubscribe(); // Clean up Firestore listener
  }, [user]);

  if (!user) {
    return null; // Do not render anything if user is not logged in
  }

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.order}>
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <div>You don't have any orders yet!</div>
          ) : (
            orders.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                {eachOrder?.data?.basket?.map((order, index) => (
                  <ProductSlice flex={true} product={order} key={index} removeBtn={true} />
                ))}
              </div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
