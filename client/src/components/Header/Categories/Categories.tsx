import { Modal } from "react-bootstrap";
import { CategoryButton } from "../../common/Button/CustomButton";
import s from "./Categories.module.scss";

import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import useSWR from "swr";
import { apiGetFetcher } from "../../../API/api";
import { Navigate } from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";

type ResponseCategories = {
  status: number;
  data: string[];
};

export default function Categories() {
  const [show, setShow] = useState(false);
  const { data: categories, error } = useSWR<ResponseCategories>(
    `/categories/`,
    apiGetFetcher
  );

  if (error) return <Navigate to={"/error"} />;
  if (!categories) return <Preloader />;

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const toggleShow = () => setShow((prev) => !prev);

  return (
    <>
      <CategoryButton onClick={toggleShow}>
        <div className={s.categories}>
          <div>
            <i className="fa-solid fa-bars fa-lg"></i>
          </div>
          <div className={s.categories_title}>Categories</div>
        </div>
      </CategoryButton>

      <Modal
        style={{ zIndex: "10000000", marginTop: "30px" }}
        show={show}
        dialogClassName={s.modalDialog}
        onHide={handleClose}
      >
        <Modal.Body>
          <Dropdown>
            {categories.data.map((item) => (
              <Dropdown.Item
                key={item}
                className={s.category_item}
                href={`/category/${item}`}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Modal.Body>
      </Modal>
    </>
  );
}
