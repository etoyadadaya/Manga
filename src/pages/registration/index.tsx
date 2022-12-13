import React, {FC} from "react";

import styles from "./styles.scss";
import {useForm} from "react-hook-form";
import useRegisterWithEmailAndPassword from "../../hooks/useRegisterWithEmailAndPassword";
import useRequireNotAuth from "../../hooks/useRequireNotAuth";
import Link from "../../components/link";
import Button from "../../components/button/button";
import Input from "../../components/input/input";

const Registration: FC = () => {
  useRequireNotAuth("/main");
  const signUp = useRegisterWithEmailAndPassword();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: "onBlur"});

  const submit = handleSubmit(data => {
    signUp({email: data.email, password: data.password});
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <form
            onSubmit={submit}
            className={styles.wrap}
          >
            <Input
              type={"text"}
              placeholder={"Enter email"}
              register={register("email", {
                required: "REQUIRED FIELD",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "INCORRECT DATA",
                },
              })}
            >
              Email
            </Input>
            <Input
              type={"password"}
              placeholder={"Enter password"}
              register={register("password", {
                required: "REQUIRED FIELD",
                minLength: {
                  value: 8,
                  message: "LENGTH < 8",
                },
                maxLength: {
                  value: 50,
                  message: "LENGTH > 50",
                },
                pattern: {
                  value:
                    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                  message: "INCORRECT DATA",
                },
              })}
            >
              Password
            </Input>
            <Button
              type={"submit"}
              className={styles.button}
              variant={"primary"}
            >
              Регистрация
            </Button>
          </form>
          <Link
            to={"/login"}
            className={styles.primary}
          >
            Войти
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
