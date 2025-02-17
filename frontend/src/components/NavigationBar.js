import React from "react";
import styles from "./styles/NavBar.module.css";

const labels = [
  "Best Sellers",
  "Newly Added",
  "Accessories",
  "WOMEN",
  "MEN",
  "Health & Beauty",
];

function NavigationBar() {
  return (
    <div className={styles.container}>
      <ul className={styles.wrapper}>
        {labels.map((label, idx) => {
          return <li key={`${label}-${idx}`}>{label}</li>;
        })}
      </ul>
    </div>
  );
}

export default NavigationBar;
