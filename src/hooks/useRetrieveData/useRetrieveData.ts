import {useContext, useEffect, useState} from "react";
import {getDownloadURL, listAll, ref} from "firebase/storage";
import {firebaseContext} from "../../contexts/firebaseContext";

const useRetrieveData = (episode: number) => {
  const {storage} = useContext(firebaseContext);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const imagesListRef = ref(storage, `berserk/${episode}/`);

    const fetchImages = async () => {
      let result = await listAll(imagesListRef);
      let urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));

      return Promise.all(urlPromises);
    }

    const loadImages = async () => {
      const urls = await fetchImages();
      setImageURLs(urls);
    }

    loadImages();
  }, [episode]);

  return imageURLs;
}

export default useRetrieveData;