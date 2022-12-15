import {useContext, useEffect, useState} from "react";
import {listAll, ref} from "firebase/storage";
import {firebaseContext} from "../../contexts/firebaseContext";

const useRetrieveNumberOfFiles = (episode: number) => {
  const {storage} = useContext(firebaseContext);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const listRef = ref(storage, `berserk/`);

    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          //
        });
        res.items.forEach((itemRef) => {
          //
        });
      }).catch((error) => {
        console.error(error);
    });
  });
}


export default useRetrieveNumberOfFiles;