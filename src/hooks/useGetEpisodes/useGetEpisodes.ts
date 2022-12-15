import {collection, getDocs} from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import {firebaseContext} from "../../contexts/firebaseContext";

const useGetEpisodes = () => {
  const {db} = useContext(firebaseContext);
  const [episode, setEpisode] = useState<number>(0);

  useEffect(() => {
    const episodesCol = collection(db, `manga`);
    getDocs(episodesCol)
      .then((docs) => {
        docs.docs.map(doc => doc.data()).map(el => {
          const episodeArr = (Object.values(el));
          setEpisode(episodeArr.pop());
        });
      });
  }, []);

  return {episode};
}

export default useGetEpisodes;