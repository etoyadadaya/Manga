import React, {FC, useEffect, useState} from "react";
import styles from "./styles.scss";
import useRequireAuth from "../../hooks/useRequireAuth";
import {Image, Carousel} from "antd";
import useRetrieveData from "../../hooks/useRetrieveData/useRetrieveData";
import Header from "../../components/header";
import useGetEpisodes from "../../hooks/useGetEpisodes/useGetEpisodes";
import Menu from "../../components/menu";

// vol.05 - 22 episodes; next vol.06
const Main: FC = () => {
  useRequireAuth("/login");
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);
  const imageUrls = useRetrieveData(num);
  // number of episodes
  const {episode} = useGetEpisodes();

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    }
  }, [isMenuActive]);

  return (
    <>
      <Menu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} episodes={episode} setEpisode={setNum}/>
      <div className={styles.container}>
        <Header toggleMenu={setIsMenuActive}/>
        <div className={styles.cards}>
          <Carousel swipe={true} adaptiveHeight={true}>
              {imageUrls.map((link, key) =>
                <Image preview={false} src={link} alt="" key={key}/>
              )}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Main;
