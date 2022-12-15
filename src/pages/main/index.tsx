import React, {FC, useState} from "react";
import styles from "./styles.scss";
import useRequireAuth from "../../hooks/useRequireAuth";
import {Image, Carousel} from "antd";
import useRetrieveData from "../../hooks/useRetrieveData/useRetrieveData";
import Header from "../../components/header";
import useGetEpisodes from "../../hooks/useGetEpisodes/useGetEpisodes";

// vol.05 - 22 episodes; next vol.06
const Main: FC = () => {
  useRequireAuth("/login");
  const [num, setNum] = useState<number>(1);
  const imageUrls = useRetrieveData(num);
  // number of episodes
  const {episode, isLoading} = useGetEpisodes();

  return (
    <div className={styles.container}>
      <Header setEpisode={setNum}/>
      <div className={styles.cards}>
        <Carousel swipe={true} adaptiveHeight={true}>
            {imageUrls.map((link, key) =>
              <Image preview={false} src={link} alt="" key={key}/>
            )}
        </Carousel>
      </div>
    </div>
  );
};

export default Main;
