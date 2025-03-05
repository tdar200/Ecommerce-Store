import React from "react";

import styles from "./styles/Typography.module.css";

export function Title({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}
