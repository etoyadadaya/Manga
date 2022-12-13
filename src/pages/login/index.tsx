import React, {FC} from "react";

import styles from "./styles.scss";
import {useForm} from "react-hook-form";
import useRequireNotAuth from "../../hooks/useRequireNotAuth";
import Link from "../../components/link";
import useSignIn from "../../hooks/useSignIn";
import Input from "../../components/input/input";
import Button from "../../components/button/button";

const Login: FC = () => {
  useRequireNotAuth("/main");
  const signIn = useSignIn();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: "onBlur"});

  const submit = handleSubmit(data => {
    signIn({email: data.email, password: data.password});
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
                required: "Email",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email",
                },
              })}
            >
              Email
            </Input>
            <Input
              type={"password"}
              placeholder={"Enter password"}
              register={register("password", {
                required: "Password",
                minLength: {
                  value: 8,
                  message: "LENGTH < 8",
                },
                pattern: {
                  value:
                    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                  message: "Invalid password",
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
              Войти
            </Button>
          </form>
          <Link
            to={"/registration"}
            className={styles.primary}
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
