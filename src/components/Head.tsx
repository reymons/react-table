import React, { CSSProperties } from "react";
import styles from "./../styles/Table.module.css";

interface IHead {
  style?: CSSProperties
  onClick?: () => any;
  withMobileHide?: boolean;
}

const Head: React.FC<IHead> = ({
  children,
  style = {},
  withMobileHide = false,
  onClick
}) => {
  return (
    <div 
      className={`${styles.head} ${withMobileHide ? styles.mobileHidden : ""}`} 
      style={style}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </div>
  )
}

export default Head;