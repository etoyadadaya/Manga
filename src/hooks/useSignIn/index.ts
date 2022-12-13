import {useContext} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {firebaseContext} from "../../contexts/firebaseContext";

const useSignIn = () => {
  const {auth} = useContext(firebaseContext);

  return async (creds: {email: string; password: string}) => {
    try {
      await signInWithEmailAndPassword(auth, creds.email, creds.password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
};

export default useSignIn;
