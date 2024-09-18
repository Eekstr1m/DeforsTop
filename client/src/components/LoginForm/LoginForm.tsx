import { FieldHookConfig, Form, Formik, FormikState, useField } from "formik";
import * as Yup from "yup";
import { API } from "../../API/api";
import { AuthUserDataI } from "../../interfaces/authUser";
import { ResponseErrorI } from "../../interfaces/error";
import { useAuthData } from "../../provider/provider";
import c from "./LoginForm.module.scss";

interface InputProps {
  label: string;
}

const MyTextInput = (props: InputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className={c.text_input_area}>
      <label htmlFor={props.id || props.name} className={c.text_label}>
        {props.label}
      </label>
      <input
        className={c.text_input}
        {...field}
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
      />
      {meta.touched && meta.error ? (
        <div className={c.error}>{meta.error}</div>
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
      <label className={c.checkbox}>
        <input {...field} type={props.type} className={c.checkbox_input} />
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
  setStatus: (status?: string) => void;
  resetForm: (nextState?: Partial<FormikState<Values>>) => void;
}

export default function LoginForm() {
  const { setAuthUserData } = useAuthData();

  const initialValues: Values = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const onSubmitHandler = async (
    values: Values,
    { setSubmitting, setStatus, resetForm }: SubmitProps
  ) => {
    await API.login(values.email, values.password, values.rememberMe).then(
      (res) => {
        if (res.status === 200) {
          // ok
          const data = res.data as AuthUserDataI;
          setAuthUserData({
            isAuth: true,
            userData: {
              _id: data._id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
            },
          });
        } else {
          setStatus((res.data as ResponseErrorI).message);
          resetForm();
        }
      }
    );
    setSubmitting(false);
  };

  return (
    <div className={c.form}>
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
        {({ isSubmitting, status }) => (
          <Form>
            {status && <div className={c.form_error}>{status}</div>}
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

            <div className={c.submit_place}>
              <button
                disabled={isSubmitting}
                className={c.submit}
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
