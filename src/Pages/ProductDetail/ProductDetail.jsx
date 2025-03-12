import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductSlice from '../../components/Product/ProductSlice';
import classes from './ProductDetail.module.css'
import Loading from '../../components/Loading/Loading';
const ProductDetail = () => {
  const { productid } = useParams();
  console.log(productid);

  const [productState, setproductState] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  const location = useLocation(); // Get location object
  const queryParams = new URLSearchParams(location.search);
  const productTitle = queryParams.get("title"); // Extract from url

  useEffect(() => {
    setisLoading(true);
    (async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${productid}`);
        setproductState(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setisLoading(false);
      }
    })();
  }, [productid]);
  

  return (
   

    <Layout>
      { 
      isLoading ? (<Loading/>) :
      <div>

<p style={{ padding: '30px' , fontSize: '20px', color:'orange'}}> {productTitle }</p>
<hr />
       
        <div className={classes.product_container}>
      

          {
          productState ? (
            <ProductSlice product={productState} flex={true} removeBtn={false} removedes={true}/>
          ) : (
            <p>Loading...</p>
          )
          }
        </div>
      </div>
      }
    </Layout>
  
  );

};

export default ProductDetail;
