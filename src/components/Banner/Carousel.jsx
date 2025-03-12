import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DataImage } from './DataImage'
import classes from './Carousel.module.css'

const bannerItem = () => {
  return (
    <>
      <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false}
>

        {DataImage.map((item, index) => (
          <div className={classes.cimg} key={index}>
            <img src={item} alt='banner' />
          </div>
        ))}


      </Carousel>
      <div className={classes.bannerFade}>
      </div>
      </>
  )
}

export default bannerItem
