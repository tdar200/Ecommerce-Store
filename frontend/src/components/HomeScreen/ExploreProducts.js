import React from "react";

import styles from "./ExploreProducts.module.css";

function ExploreProducts() {
  const imageURL =
    "https://optimise2.assets-servd.host/hubbub-uk/production/assets/images/HUBBUB-WEB-BANNER_TIPS_FASHION_Laundry-care-tips.jpg?w=1200&h=630&auto=compress%2Cformat&fit=crop&dm=1690374356&s=bffaf87fb9999a7b4535e42cca74c8a5";

  return (
    <a href='/products'>
      <div
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
        className={styles.container}>
        <div
          style={{
            display: "grid",
            height: "100%",
            justifyItems: "center",
            alignContent: "center",
          }}>
          <h1
            style={{
              color: "white",
              textShadow: "3px 3px black",
              textAlign: "center",
            }}>
            VIEW ALL THE DEALS AT
          </h1>
          <h2
            style={{
              color: "white",
              textAlign: "center",
              textShadow: "3px 3px black",
            }}>
            BACKYARD STORE
          </h2>
        </div>
      </div>
    </a>
  );
}

export default ExploreProducts;
