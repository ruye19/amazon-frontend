import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import classes from './Cart.module.css';
import { DataContext } from '../../components/dataProvider/DataProvider';
import ProductSlice from '../../components/Product/ProductSlice';
import { Link } from 'react-router-dom';
import FormatCurrency from '../../components/FormatCurrency/FormatCurrency'; // Assuming FormatCurrency is already created
import { Type } from '../../utility/action.type';
import { FaAngleUp } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

const Cart = () => {
    const [{ basket, user }, dispatch] = useContext(DataContext); 

    // Debugging - Check if basket has items with price
    // console.log("Basket Data:", basket);
    // basket.forEach(item => console.log(`ID: ${item.id}, Price: ${item.price}, Amount: ${item.amount}`));

    // Calculate the total price of items in the basket
    const total = basket?.reduce((amount, item) => {
        return (item.price ?? 0) * item.amount + amount;  // ✅ Ensure price is not undefined
    }, 0);

    // Increase item quantity
    const increment = (item) => {
        dispatch({
            type: Type.ADD_TO_BASKET,
            item
        });
    };

    // Decrease item quantity or remove if it's the last one
    const decrement = (id) => {
        dispatch({
            type: Type.REMOVE_FROM_BASKET,
            id 
        });
    };

    return (
        <Layout>
            <div className={classes.cartTitle}>
                <h2>Hello,</h2>
                <h4>Your shopping basket</h4>
                <hr />
            </div>

            <div className={classes.container}>
                <div className={classes.cart_container}>
                    {basket?.length === 0 ? (
                        <h3 className={classes.fourofour}>
                            Oops! No item in your cart <br />
                            Go grab something
                        </h3>
                    ) : (
                        basket.map((item, index) => (
                            <section key={index} className={classes.cart_product}>
                                <ProductSlice product={item} flex={true} removeBtn={true} removedes={false}/>



                                <div className={classes.btn_container}>
                                    <button className={classes.btn} onClick={() => increment(item)}>
                                        <FaAngleUp size={20} />
                                    </button>
                                    <span>{item.amount}</span>
                                    <button className={classes.btn} onClick={() => decrement(item.id)}>
                                        <IoChevronDown size={20} />
                                    </button>
                                </div>
                            </section>
                        ))
                    )}
                </div>

                {basket?.length > 0 && (
                    <div className={classes.subtotal}>
                        <div>
                            <p>Subtotal ({basket.length} items)</p>
                            <FormatCurrency amount={total} />
                        </div>
                        <span>
                            <input type="checkbox" />
                            <small>This order contains a gift</small>
                        </span>
                        <Link to="/payment">Continue to checkout</Link>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Cart;
