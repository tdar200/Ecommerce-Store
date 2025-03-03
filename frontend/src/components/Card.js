import React from "react";

import styles from "./styles/Card.module.css";

function Card({
  _id,
  rating = 0,
  item_name,
  selling_price,
  currency,
  size,
  stockQuantity,
  color,
  category,
  image_url,
  createdAt,
  updatedAt,
  user,
  reviews,
  height,
  width,
}) {
  return (
    <div style={{ width: width, height: height }} className={styles.container}>
      <img className={styles.image} src={image_url} alt={item_name} />
      <div className={styles.descriptionWrapper}>
        <h3 className={styles.title}>{item_name?.toUpperCase()}</h3>
        <h4 className={styles.price}>
          {currency === "GBP" ? "£ " : "PKR "}{" "}
          {parseFloat(selling_price).toFixed(2)}
        </h4>
      </div>
    </div>
  );
}

export default Card;
