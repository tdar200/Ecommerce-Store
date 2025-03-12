import React from "react";
import styles from "./DeliveryProduct.module.css";

function DeliveryProduct() {
  return (
    <div
      style={{
        backgroundImage: `url(https://passportglobal.com/wp-content/uploads/2024/03/cljj243vq1n72owewpowag4hg-istock-1414801672.full_.jpg)`,
        width: "100%",
        height: "90vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        flex: 1,
        backgroundPosition: "center",
      }}
      className='div-image'>
      <div
        style={{
          display: "grid",
          height: "100%",
          justifyItems: "center",
          alignContent: "center",
        }}>
        <h3
          style={{
            color: "white",

            fontWeight: "900",
            textAlign: "center",
            fontFamily: "Montserrat,sans-serif",
          }}>
          Free Delivery on all the products
        </h3>
        <h4
          style={{
            color: "white",
            fontSize: "20px",
            textAlign: "center",
            lineHeight: "2rem",
          }}>
          We've got deals to meet everyone's need!
        </h4>

        <a
          style={{
            justifyContent: "center",
            display: "flex",
            padding: "30px",
          }}
          href='/products'>
          <button className={styles.buttonWrapper}>ORDER NOW</button>
        </a>
      </div>
    </div>
  );
}

export default DeliveryProduct;
