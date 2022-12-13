import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {firebaseContext} from "../../contexts/firebaseContext";

const useRequireNotAuth = (redirectUrl: string) => {
  const {auth} = useContext(firebaseContext);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate(redirectUrl);
    }
  }, [user, loading]);
};

export default useRequireNotAuth;
