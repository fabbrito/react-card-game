import React from "react";
import styles from "./Loader.module.scss";

interface Props {
  children?: React.ReactNode;
}

const Loader: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles["loader"]}>
      <span className={[styles["loader__ball"], styles["loader__ball--1"]].join(" ")} />
      <span className={[styles["loader__ball"], styles["loader__ball--2"]].join(" ")} />
      <span className={[styles["loader__ball"], styles["loader__ball--3"]].join(" ")} />
    </div>
  );
};

export default Loader;
