import {useContext} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {firebaseContext} from "../../contexts/firebaseContext";

const useRegisterWithEmailAndPassword = () => {
  const {auth, db} = useContext(firebaseContext);

  return async (creds: {email: string; password: string}) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        creds.email,
        creds.password
      );
      const {user} = res;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email: creds.email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
};

export default useRegisterWithEmailAndPassword;
