import React from "react";
import { ReactComponent as Logo } from "../img/logo.svg";
import "../styles/Header.scss";

interface Props {
  children?: React.ReactNode;
}
const Header: React.FC<Props> = ({ children }) => {
  return (
    <header className="header box-shadow">
      <div className="header-main">
        <Logo className="logo" title="Logo" />
        <h2>Simple Card Game</h2>
      </div>
    </header>
  );
};

export default Header;
