import React, {FC, useContext} from "react";
import styles from "./styles.scss";
import useRequireAuth from "../../hooks/useRequireAuth";
import {signOut} from "firebase/auth";
import {firebaseContext} from "../../contexts/firebaseContext";
import Button from "../../components/button/button";

const Main: FC = () => {
  useRequireAuth("/login");
  const {auth} = useContext(firebaseContext);

  return (
    <>
      <div className={styles.container}>
        <Button
          onClick={() => {
            signOut(auth);
          }}
          variant={"close"}
        >
          LOGOUT
        </Button>
      </div>
    </>
  );
};

export default Main;
