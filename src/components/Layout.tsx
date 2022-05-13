import React from "react";
import "../styles/Layout.scss";

interface Props {
  children?: React.ReactNode;
  className?: string;
}
const Layout: React.FC<Props> = ({ children, className }) => {
  return <div className={`layout ${className ?? ""}`}>{children}</div>;
};

export default Layout;
