import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { DataContext } from '../../components/dataProvider/DataProvider';
import classes from './Payment.module.css';
import ProductSlice from '../../components/Product/ProductSlice';
import Loading from '../../components/Loading/Loading';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import FormatCurrency from '../../components/FormatCurrency/FormatCurrency';
import { axiosInstance } from '../../API/axios';
import { ClipLoader } from 'react-spinners';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../utility/firebase';
import { Link, useNavigate } from 'react-router';
import { Type } from '../../utility/action.type';

const Payment = () => {
   const [{ user, basket },dispatch] = useContext(DataContext);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');


   const stripe = useStripe();
   const elements = useElements();
   const navigate = useNavigate();
 

   useEffect(() => {
      if (!user) {
         setLoading(true);
         localStorage.setItem('redirectAfterLogin','/payment')
         const timer = setTimeout(() => setLoading(false), 1500);
         return () => clearTimeout(timer);
      }
   }, [user]);

   if (!user) {
      return loading ? (
         <Loading />
      ) : (
         <Layout>
            <div >
               <p style={{ fontSize: 26, color: "red", fontWeight: 800,textAlign:'center' }}>NOT Authorized : Please Login first Or Create An Account First.</p>
               <Link style={{
                  fontSize:20, color:'orange',fontWeight: "bold", wordSpacing:4
               }} to='/auth'> Go To Login Page </Link> 
            </div>
         </Layout>
      );
   }

   const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
   const total = basket?.reduce((amount, item) => (item.price ?? 0) * item.amount + amount, 0);

   const handleError = (e) => {
      setError(e?.error?.message || '');
   };

   const handlePayment = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
         console.error("Stripe.js has not loaded yet.");
         return;
      }

      setLoading(true);
      try {
         const response = await axiosInstance.post(`/payment/create?total=${total * 100}`);
         const clientSecret = response.data?.clientSecret;

         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: elements.getElement(CardElement),
            },
         });

         if (error) {
            setError(error.message);
         } else if (paymentIntent.status === "succeeded") {
            console.log("Payment succeeded:", paymentIntent);

            // Save order to Firestore v9
            await setDoc(doc(collection(db, 'users', user.uid, 'orders'), paymentIntent.id), {
               basket: basket,
               amount: paymentIntent.amount,
               created: paymentIntent.created,
            });
            //empty basket as it store in the database
            dispatch({
               type:Type.EMPTY_BASKET
            })
             

            navigate('/orders', {state :{msg :"you have placed new order"}})


         }
      } catch (error) {
         console.error("Error during payment:", error);
         setError("An error occurred during payment. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <Layout>
         <div className={classes.checkoutheader}>
            <p>Checkout ({totalItem}) items</p>
         </div>
         <section className={classes.sectionPayment}>
            <div className={classes.flexx}>
               <h3>Delivery Address</h3>
               <hr />
            </div>
            <div>
               <div>{user?.email}</div>
               <div>4 Kilo, Addis Ababa</div>
               <div>AAIT</div>
            </div>
         </section>
         <hr />
         <div className={classes.flexx}>
            <h3>Review items and delivery</h3>
            <div>
               {basket?.map((item, index) => (
                  <ProductSlice key={index} product={item} flex={true} hideButton={true} />
               ))}
            </div>
         </div>
         <hr />
         <div className={classes.flexx}>
            <h3>Payment Methods</h3>
            <div className={classes.card_payment}>
               <form onSubmit={handlePayment}>
                  {error && <small style={{ color: 'red' }}>{error}</small>}
                  <CardElement onChange={handleError} />
                  <div>
                     <div className={classes.card_pay_now}>
                        <span>
                           Total price | <FormatCurrency amount={total} />
                        </span>
                        <button type="submit" disabled={!stripe || loading}>
                           {loading ? <ClipLoader size={12} color='white' /> : "Pay Now"}
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </Layout>
   );
};

export default Payment;
