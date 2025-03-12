import React from "react"
import classes from './Catagory.module.css'
import { Link } from "react-router"
import { productUrl } from "../../API/endPoint"
const CatagorySlice = ({data}) => {
  // console.log(data)
  return (
    <div className={classes.catagorySlice}>
      <Link to={`/categories/${data.id}?title=${encodeURIComponent(data.title)}`}>
        <h2>{data.title}</h2>
        <img src={data.image} alt={data.title} />
        
      </Link>
      <p>Shop now</p>
    </div>
  )
}

export default CatagorySlice
