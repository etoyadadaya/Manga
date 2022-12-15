import React, {Dispatch, FC} from "react";
import styles from "./styles.scss";
import {Menu} from "antd";
import button from "../button/button";

interface IHeader {
  setEpisode: Dispatch<number>;
}

const Header: FC<IHeader> = ({setEpisode}) => {
  return (
    <Menu>
      <div className={styles.header}>
        <button className={styles.btn} onClick={() => setEpisode(1)}>1</button>
        <button className={styles.btn} onClick={() => setEpisode(2)}>2</button>
        <button className={styles.btn} onClick={() => setEpisode(3)}>3</button>
        <button className={styles.btn} onClick={() => setEpisode(4)}>4</button>
        <button className={styles.btn} onClick={() => setEpisode(5)}>5</button>
        <button className={styles.btn} onClick={() => setEpisode(6)}>6</button>
        <button className={styles.btn} onClick={() => setEpisode(7)}>7</button>
        <button className={styles.btn} onClick={() => setEpisode(8)}>8</button>
        <button className={styles.btn} onClick={() => setEpisode(9)}>9</button>
        <button className={styles.btn} onClick={() => setEpisode(10)}>10</button>
        <button className={styles.btn} onClick={() => setEpisode(11)}>11</button>
        <button className={styles.btn} onClick={() => setEpisode(12)}>12</button>
        <button className={styles.btn} onClick={() => setEpisode(13)}>13</button>
        <button className={styles.btn} onClick={() => setEpisode(14)}>14</button>
        <button className={styles.btn} onClick={() => setEpisode(15)}>15</button>
        <button className={styles.btn} onClick={() => setEpisode(16)}>16</button>
        <button className={styles.btn} onClick={() => setEpisode(17)}>17</button>
        <button className={styles.btn} onClick={() => setEpisode(18)}>18</button>
        <button className={styles.btn} onClick={() => setEpisode(19)}>19</button>
        <button className={styles.btn} onClick={() => setEpisode(20)}>20</button>
        <button className={styles.btn} onClick={() => setEpisode(21)}>21</button>
        <button className={styles.btn} onClick={() => setEpisode(22)}>22</button>
        <button className={styles.btn} onClick={() => setEpisode(23)}>23</button>
        <button className={styles.btn} onClick={() => setEpisode(24)}>24</button>
        <button className={styles.btn} onClick={() => setEpisode(25)}>25</button>
      </div>
    </Menu>
  );
};

export default Header;