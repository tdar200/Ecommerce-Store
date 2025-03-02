import React from "react";

import styles from "../css/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footerWrapper}>
        <h4 className={styles.footerTitle}>
          © BACKYARD STORE ALL RIGHTS RESERVED
        </h4>
        <div className={styles.buttonContainer}>
          <button
            style={{
              backgroundColor: "#4267B2",
            }}
            onClick={() =>
              window.open("https://www.facebook.com/Backyardbbqrestaurant")
            }
            className={styles.buttonWrapper}>
            <i className={`fab fa-facebook-square ${styles.iconWrapper}`}></i>{" "}
            LIKE US ON FACEBOOK
          </button>
          <button
            style={{
              backgroundColor: "#F58529",
            }}
            onClick={() =>
              window.open("https://www.instagram.com/backyard.bbq.restaurant")
            }
            className={styles.buttonWrapper}>
            <i className={`fab fa-instagram ${styles.iconWrapper}`}></i> FOLLOW
            US ON INSTAGRAM
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
