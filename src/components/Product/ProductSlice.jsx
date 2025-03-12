import React, { useContext } from "react";
import FormatCurrency from "../FormatCurrency/FormatCurrency";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";
import { DataContext } from "../dataProvider/DataProvider";
import { Type } from "../../utility/action.type";

function ProductSlice({ product, flex, removeBtn, removedes, hideButton }) {
  if (!product) {
    return <p>Error: Product is missing!</p>;
  }

  const { images, title, id, price, description } = product;
  const [State, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { images, title, id, price, description },
    });
  };

  return (
    <div className={`${classes.productSlice} ${flex ? classes.productDetail : ""}`}>
      {/* Product Image */}
      <Link
        className={classes.imageProduct}
        to={`/products/${product.id}?title=${encodeURIComponent(product.title)}`}
      >
        {images && images.length > 0 ? (
          <img src={product.images[0]} alt="productImage" />
        ) : (
          <p>No image available</p> // Fallback text
        )}
      </Link>

      {/* Product Info */}
      <div className={classes.productInfo}>
        <h3>{title}</h3>

        {/* Description */}
        {removedes && (
          <p className={`${classes.description} ${flex ? classes.show : ""}`}>
            {description}
          </p>
        )}

        <div className={classes.price}>
          <FormatCurrency amount={price} />
        </div>

        {/* Conditionally render the button */}
        {!removeBtn && !hideButton && (
          <button className={flex ? classes.buyNow : classes.addCart} onClick={addToCart}>
            {flex ? "Buy Now" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductSlice;
