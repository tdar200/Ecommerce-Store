import React from "react";

import styles from "./styles/Card.module.css";

function Card({
  _id,
  rating = 0,
  itemName,
  price,
  currency,
  size,
  stockQuantity,
  color,
  category,
  imageUrl,
  createdAt,
  updatedAt,
  user,
  reviews,
  height,
  width,
}) {
  return (
    <div style={{ width: width, height: height }} className={styles.container}>
      <img className={styles.image} src={imageUrl} alt={itemName} />
      <div className={styles.descriptionWrapper}>
        <h3 className={styles.title}>{itemName?.toUpperCase()}</h3>
        <h4 className={styles.price}>
          {currency === "GBP" ? "£ " : "PKR "} {parseFloat(price).toFixed(2)}
        </h4>
      </div>
    </div>
  );
}

export default Card;
