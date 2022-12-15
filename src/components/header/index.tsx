import React, {Dispatch, FC, HTMLProps} from "react";
import styles from "./styles.scss";
import button from "../button/button";

interface IHeader extends HTMLProps<HTMLElement>{
  toggleMenu: Dispatch<boolean>
}

const Header: FC<IHeader> = ({toggleMenu}) => {
  return (
      <div className={styles.header}>
        <div className={styles.chapterSelector}>
          <button onClick={() => toggleMenu(true)} className={styles.listBtn}>Список эпизодов</button>
        </div>
      </div>
  );
};

export default Header;