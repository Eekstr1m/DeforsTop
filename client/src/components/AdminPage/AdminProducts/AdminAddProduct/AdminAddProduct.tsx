import { FieldHookConfig, Form, Formik, useField } from "formik";
import * as Yup from "yup";
import s from "./AdminAddProduct.module.scss";
import { useEffect, useState } from "react";
import { CustomBtn } from "../../../common/Button/CustomButton";
import axios from "axios";

export default function AdminAddProduct() {
  return (
    <div className={s.wrapper}>
      <AddProductForm />
      {/* <UploadAndDisplayImage /> */}
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

interface Values {
  title: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  category: string;
  photo: string;
  specification: Array<SpecificationsObject>;
}
type SpecificationsObject = {
  name: string;
  desc: string;
};

function AddProductForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues: Values = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    brand: "",
    category: "",
    photo: "",
    specification: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={Yup.object({
      //     email: Yup.string()
      //       .email("Invalid email address`")
      //       .required("Required"),
      //     password: Yup.string().required("Required"),
      //   })}
      onSubmit={() => console.log("ok")}
    >
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <h2 className={s.title}>Add Product</h2>
          {errorMessage && <div className={s.form_error}>{errorMessage}</div>}
          <CustomInput
            label="Title"
            name="title"
            type="text"
            placeholder="Iphone X"
          />
          <CustomInput
            label="Description"
            name="description"
            type="text"
            placeholder="An apple mobile device"
          />
          {/* Need add images */}
          <UploadAndDisplayImage />

          {/* Add choosing items from categories */}
          <CustomInput
            label="Category"
            name="category"
            type="text"
            placeholder="Smartphone"
          />
          <CustomInput
            label="Brand"
            name="brand"
            type="text"
            placeholder="Apple"
          />
          <CustomInput label="Price" name="price" type="number" />
          <CustomInput label="Quantity" name="quantity" type="number" />
          {/* Add specifications array input */}
          {/* <CustomInput
            label="Specifications"
            name="specifications"
            type="specifications"
            placeholder=""
          /> */}

          <CustomBtn
          //  disabled={isSubmitting}
          >
            Submit
          </CustomBtn>
        </Form>
      )}
    </Formik>
  );
}

const UploadAndDisplayImage = () => {
  const [images, setImages] = useState<Array<Blob>>([]);
  const [imageURLS, setImageURLs] = useState<Array<string>>([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: Array<string> = [];

    images.forEach((image: Blob) =>
      newImageUrls.push(URL.createObjectURL(image))
    );

    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  }

  const onClickHandler = async () => {
    if (!images) {
      return;
    }

    const fd = new FormData();
    fd.append("title", "example");
    for (let i = 0; i < images.length; i++) {
      fd.append(`avatar`, images[i]);
    }

    axios
      .post("http://localhost:4000/test", fd, {
        // onUploadProgress: (progressEvent) => {
        //   console.log(progressEvent.progress * 100);
        // },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className={s.image_wrapper}>
      <label className={s.text_label} htmlFor="image">
        Image
      </label>
      {imageURLS.length > 0 && (
        <div className={s.image_preview}>
          {imageURLS.map((imageSrc) => (
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
    </div>
  );
};
