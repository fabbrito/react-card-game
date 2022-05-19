import React from "react";
import styles from "./Loader.module.scss";
import classnames from "classnames/bind";

let cx = classnames.bind(styles);

interface Props {
  children?: React.ReactNode;
}

const Loader: React.FC<Props> = ({ children }) => {
  return (
    <div className={cx("loader")}>
      <span className={cx("loader__ball")} />
      <span className={cx("loader__ball")} />
      <span className={cx("loader__ball")} />
    </div>
  );
};

export default Loader;
