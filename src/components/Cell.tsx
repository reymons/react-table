import React from "react";
import styles from "./../styles/Table.module.css";

interface ICell {
  url?: string;
  withMobileHide?: boolean;
}

const Cell: React.FC<ICell> = ({ url = "", children, withMobileHide }) => {
  const handleClick = () => {
    if (url.length) {
      window.location.href = url;
    }
  }

  return (
    <div
      className={`${styles.cell} ${withMobileHide ? styles.mobileHidden : ""}`}
      onClick={handleClick}
      style={{
        cursor: url.length ? "pointer" : "default",
        color: url.length ? "blue" : "black"
      }}
    >
      {children}
    </div>
  )
}

export default Cell;