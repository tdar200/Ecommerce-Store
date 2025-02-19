import React from "react";

import styles from "./styles/Card.module.css";

function Card({
  _id,
  rating,
  itemName,
  price,
  currency,
  size,
  stockQuantity,
  color,
  categoryId,
  imageUrl,
  option1Name,
  option2Name,
  createdAt,
  updatedAt,
  user,
  reviews,
}) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageUrl} alt={itemName} />
      <div className={styles.descriptionWrapper}>
        <h3 className={styles.title}>{itemName.toUpperCase()}</h3>
        <h4 className={styles.price}>
          {currency === "pounds" && "£ "} {price}
        </h4>
      </div>
    </div>
  );
}

export default Card;
