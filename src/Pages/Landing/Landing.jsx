import React from 'react'
import Layout from '../../components/layout/Layout.jsx'
import Product from '../../components/Product/Product.jsx'
import Catagory from '../../components/Catagory/Catagory.jsx'
import Banner from '../../components/Banner/Carousel.jsx'


const Landing = () => {
  return (
    <Layout>
        <Banner />
      <Catagory />
      <Product />
    </Layout>
    

)
}

export default Landing
