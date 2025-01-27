import { FieldHookConfig, Form, Formik, FormikState, useField } from "formik";
import * as Yup from "yup";
import { API } from "../../API/api";
import { AuthUserDataI } from "../../interfaces/authUser";
import { ResponseErrorI } from "../../interfaces/error";
import { useAuthData } from "../../provider/provider";
import s from "./LoginForm.module.scss";
import { useState } from "react";

interface InputProps {
  label: string;
}

const MyTextInput = (props: InputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className={s.text_input_area}>
      <label htmlFor={props.id || props.name} className={s.text_label}>
        {props.label}
      </label>
      <input
        className={s.text_input}
        {...field}
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
      />
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

interface CheckBoxProps {
  children: string;
}

const MyCheckbox = (props: CheckBoxProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className={s.checkbox}>
        <input {...field} type={props.type} className={s.checkbox_input} />
        {props.children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

interface Values {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SubmitProps {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (nextState?: Partial<FormikState<Values>>) => void;
}

export default function LoginForm() {
  const { setAuthUserData } = useAuthData();
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues: Values = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting, resetForm }: SubmitProps
  ) => {
    await API.login(values.email, values.password, values.rememberMe).then(
      (res) => {
        if (res.status === 200) {
          const data = res.data as AuthUserDataI;
          setAuthUserData(data);
        } else {
          setErrorMessage((res.data as ResponseErrorI).message);
          resetForm();
        }
      }
    );
    setSubmitting(false);
  };

  return (
    <div className={s.form}>
      <h1>Log In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address`")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={onSubmitHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            {errorMessage && <div className={s.form_error}>{errorMessage}</div>}
            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="email@address.com"
            />
            <MyTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <MyCheckbox name="rememberMe" type="checkbox">
              Stay signed
            </MyCheckbox>

            <div className={s.submit_place}>
              <button
                disabled={isSubmitting}
                className={s.submit}
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
