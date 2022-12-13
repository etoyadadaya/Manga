import {useContext} from "react";
import {signOut} from "firebase/auth";
import {firebaseContext} from "../../contexts/firebaseContext";

const useLogout = () => {
  const {auth} = useContext(firebaseContext);

  return () => {
    signOut(auth);
  };
};

export default useLogout;
