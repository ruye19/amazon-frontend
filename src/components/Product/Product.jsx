import React, { useEffect, useState } from 'react';
import classes from './Product.module.css';
import axios from 'axios';
import ProductSlice from './ProductSlice';
import Loading from '../Loading/Loading';

const Product = () => {
    const [product, setProduct] = useState([]);
    const [isloading, setisloading] = useState(true); 

    useEffect(() => {
        let isMounted = true; // Prevent state update on unmounted component
        setisloading(true);
        
        (async () => {
            try {
                const fetch = await axios.get('https://api.escuelajs.co/api/v1/products');
                if (isMounted) {
                    setProduct(fetch.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                if (isMounted) {
                    setisloading(false);
                }
            }
        })();

        return () => {
            isMounted = false; // Cleanup function
        };
    }, []);

    return (
        <>
            {isloading ? (
                <Loading />
            ) : (
                <div className={classes.productWrapper}>
                    {product.length > 0 ? (
                        product.map((productt) => (
                            <ProductSlice key={productt.id} product={productt} removeBtn={false}   removedes={true}/>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Product;
