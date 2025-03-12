import React from "react";

import styles from "./ExploreProducts.module.css";

function ExploreProducts() {
  const imageURL =
    "https://cdn.thewirecutter.com/wp-content/media/2024/12/ROUNDUP-KOREAN-SKINCARE-2048px-9736-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp";

  return (
    <a href='/products'>
      <div
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
        className={styles.container}>
        <div className={styles.descriptionContainer}>
          <h1 className={styles.header}>VIEW ALL THE DEALS AT</h1>
          <h2 className={styles.subHeader}>BACKYARD STORE</h2>
        </div>
      </div>
    </a>
  );
}

export default ExploreProducts;
