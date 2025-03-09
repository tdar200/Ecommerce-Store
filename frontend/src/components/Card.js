import React from "react";

import styles from "./styles/Card.module.css";

function Card({
  _id,
  rating = 0,
  item_name,
  selling_price,
  currency,
  description,
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
  brand,
}) {
  return (
    <div
      key={_id}
      style={{ width: width, height: height }}
      className={styles.container}>
      <img className={styles.image} src={image_url} alt={item_name} />
      <div className={styles.descriptionWrapper}>
        <h4 className={styles.title}>{item_name?.toUpperCase()}</h4>
        <h4 className={styles.brand}>{brand?.toUpperCase()}</h4>
        <h3 className={styles.price}>
          {currency === "gbp" || currency === "GBP" ? "£" : "PKR"}{" "}
          {parseFloat(selling_price).toFixed(2)}
        </h3>
      </div>
    </div>
  );
}

export default Card;
