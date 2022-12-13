import {useContext} from "react";
import {sendPasswordResetEmail} from "firebase/auth";
import {firebaseContext} from "../../contexts/firebaseContext";

const usePasswordReset = () => {
  const {auth} = useContext(firebaseContext);

  return async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
};

export default usePasswordReset;
