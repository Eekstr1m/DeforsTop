import {
  Field,
  FieldArray,
  FieldHookConfig,
  Form,
  Formik,
  FormikErrors,
  FormikState,
  useField,
} from "formik";
import * as Yup from "yup";
import s from "./AdminAddProduct.module.scss";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import useSWR from "swr";
import { CustomBtn } from "../../../common/Button/CustomButton";
import { ResponseCategories } from "../../../Header/Categories/Categories";
import { apiGetFetcher, instance } from "../../../../API/api";
import { Navigate } from "react-router-dom";
import Preloader from "../../../common/Preloader/Preloader";

export default function AdminAddProduct() {
  return (
    <div className={s.wrapper}>
      <AddProductForm />
    </div>
  );
}

interface InputProps {
  label: string;
}

const CustomInput = (props: InputProps & FieldHookConfig<string>) => {
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

const CustomTextarea = (props: InputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className={s.text_input_area}>
      <label htmlFor={props.id || props.name} className={s.text_label}>
        {props.label}
      </label>
      <textarea
        className={s.text_input}
        {...field}
        placeholder={props.placeholder}
        name={props.name}
      />
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

interface Values {
  title: string;
  description: string;
  price: string;
  quantity: string;
  brand: string;
  category: string;
  photo: Array<Blob>;
  photoURLS: string[];
  specification: Array<SpecificationsObject>;
}
type SpecificationsObject = {
  name: string;
  desc: string;
};
interface SubmitProps {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: (nextState?: Partial<FormikState<Values>>) => void;
}

function AddProductForm() {
  // Fetching list of categories used for Categories input field
  const { data: categories, error } = useSWR<ResponseCategories>(
    `/categories/`,
    apiGetFetcher
  );

  if (error) return <Navigate to={"/error"} />;
  if (!categories) return <Preloader />;

  const initialValues: Values = {
    title: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    category: "smartphone",
    photo: [],
    photoURLS: [],
    specification: [],
  };

  const validationMessages = {
    required: "This is required field",
    min: "Must be greater than or equal to 1",
  };

  const onSubmitHandler = async (
    values: Values,
    { setSubmitting, resetForm }: SubmitProps
  ) => {
    setSubmitting(true);
    // Setting formdata to send to the server
    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("description", values.description);
    fd.append("price", values.price);
    fd.append("quantity", values.quantity);
    fd.append("brand", values.brand);
    fd.append("category", values.category);
    fd.append("specification", JSON.stringify(values.specification));
    for (let i = 0; i < values.photo.length; i++) {
      fd.append(`thumbnail`, values.photo[i]);
    }
    // Creating toast to display fetch status
    const statusLoading = toast.loading("Product creation is pending");

    // POST fetch to create product
    instance
      .post("http://localhost:4000/products", fd)
      .then(() => {
        resetForm();
        // Display success fetch status
        toast.update(statusLoading, {
          render: "Product created successfully",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .catch(() => {
        // Display error fetch status
        toast.update(statusLoading, {
          render: "Product creation failed",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().required(validationMessages.required),
        description: Yup.string().required(validationMessages.required),
        price: Yup.number()
          .min(1, validationMessages.min)
          .required(validationMessages.required),
        quantity: Yup.number()
          .min(0, validationMessages.min)
          .required(validationMessages.required),
        brand: Yup.string().required(validationMessages.required),
        specification: Yup.array().of(
          Yup.object({
            name: Yup.string().required(validationMessages.required),
            desc: Yup.string().required(validationMessages.required),
          })
        ),
        photo: Yup.array().of(
          Yup.mixed<File>().test(
            "fileSize",
            (value) => !value || (value && value.size <= 1024 * 1024)
          )
        ),
      })}
      onSubmit={onSubmitHandler}
    >
      {({ errors, touched, values, isSubmitting, setFieldValue }) => {
        // Adding type to an specifications list
        const specError =
          errors.specification as FormikErrors<SpecificationsObject>[];

        // Adding type to an photos list
        const photoError = errors.photo as FormikErrors<File>[];

        return (
          <Form className={s.form}>
            {/* Display toast messages */}
            <ToastContainer />
            <h2 className={s.title}>Add Product</h2>
            <CustomInput
              label="Title"
              name="title"
              type="text"
              placeholder="Iphone X"
            />
            <CustomTextarea
              label="Description"
              name="description"
              type="textarea"
              placeholder="An apple mobile device"
            />
            {/* Adding images */}
            <UploadAndDisplayImage
              setFieldValue={setFieldValue}
              photoError={photoError}
              photo={values.photo}
              photoURLS={values.photoURLS}
            />

            {/* Adding category from categories list */}
            <label htmlFor={"category"} className={s.text_label}>
              Category
            </label>
            <Field className={s.text_input} as="select" name="category">
              {categories.data.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Field>

            <CustomInput
              label="Brand"
              name="brand"
              type="text"
              placeholder="Apple"
            />
            <CustomInput
              label="Price"
              name="price"
              type="number"
              placeholder="1299"
            />
            <CustomInput
              label="Quantity"
              name="quantity"
              type="number"
              placeholder="12"
            />

            {/* Input list of specifications */}
            <label className={s.text_label}>Specifications</label>
            <FieldArray
              name="specification"
              render={(arrayHelpers) => (
                <div>
                  {values.specification.length > 0 &&
                    values.specification.map((paramList, index) => (
                      <div className={s.spec_field} key={index}>
                        {Object.keys(paramList).map((param) => (
                          <div
                            key={`${index}${param}`}
                            className={s.spec_inputs_block}
                          >
                            <Field
                              className={s.spec_input}
                              name={`specification.${index}.${param}`}
                              placeholder={
                                param === "name"
                                  ? "Specification name"
                                  : "Specification description"
                              }
                            />
                            {errors.specification &&
                            touched.specification &&
                            specError[index] ? (
                              param === "name" ? (
                                <div
                                  hidden={!specError[index].name}
                                  className={s.error}
                                >
                                  {specError[index].name}
                                </div>
                              ) : (
                                <div
                                  hidden={!specError[index].desc}
                                  className={s.error}
                                >
                                  {specError[index].desc}
                                </div>
                              )
                            ) : null}
                          </div>
                        ))}

                        {/* <div className={s.error}>{specError[index].name}</div> */}

                        <div
                          className={s.spec_delete}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      </div>
                    ))}
                  <div
                    className={s.spec_add_container}
                    onClick={() => arrayHelpers.push({ name: "", desc: "" })}
                  >
                    <div className={s.spec_add}>
                      <i className="fa-solid fa-plus"></i>
                      <span>Add specification</span>
                    </div>
                  </div>
                </div>
              )}
            />

            <CustomBtn disabled={isSubmitting}>Submit</CustomBtn>
          </Form>
        );
      }}
    </Formik>
  );
}

const UploadAndDisplayImage = ({
  setFieldValue,
  photoError,
  photo,
  photoURLS,
}: {
  setFieldValue: (
    field: string,
    value: Blob[] | string[],
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<Values>>;
  photoError: FormikErrors<File>[] | undefined;
  photo: Array<Blob>;
  photoURLS: string[];
}) => {
  useEffect(() => {
    if (photo.length < 1) return;
    const newImageUrls: Array<string> = [];

    photo.forEach((image: Blob) =>
      newImageUrls.push(URL.createObjectURL(image))
    );

    setFieldValue("photoURLS", newImageUrls);
  }, [photo, setFieldValue]);

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFieldValue("photo", [...e.target.files]);
    }
  }

  return (
    <div className={s.image_wrapper}>
      <label className={s.text_label} htmlFor="image">
        Image
      </label>
      {photoURLS.length > 0 && (
        <div className={s.image_preview}>
          {photoURLS.map((imageSrc) => (
            <img
              className={s.image_item}
              key={imageSrc}
              src={imageSrc}
              alt="not found"
              width={"250px"}
            />
          ))}
        </div>
      )}

      <label className={s.image_label}>
        <input
          style={{ display: "none" }}
          type="file"
          name="image"
          multiple
          accept="image/*"
          onChange={onImageChange}
        />
        <i className="fa-solid fa-upload"></i>
        Upload
      </label>

      {photoError &&
        photoError.map((value, index) => (
          <div key={`${value} ${index}`} className={s.error}>{`Image number ${
            index + 1
          } has too large size`}</div>
        ))}
    </div>
  );
};
