import { ResponseProductsI } from "../../interfaces/productsI";
import PriceFilter from "./Filters/PriceFilter";
import SortFilter from "./Filters/SortFilter";
import ProductCard from "../ProductCard/ProductCard";
import s from "./ProductList.module.scss";
import BrandFilter from "./Filters/BrandFilter";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { CustomButtonStyle } from "../common/Button/CustomButton";

export default function ProductsWrapper({
  productsData,
}: {
  productsData: ResponseProductsI;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div className={s.wrapper}>
      <div className={s.filters}>
        <SortFilter />

        <div className={s.filters_modal}>
          <CustomButtonStyle>
            <div onClick={toggleShow}>Filters</div>
          </CustomButtonStyle>
          <Modal
            dialogClassName={s.filter_modal}
            show={show}
            onHide={handleClose}
            contentClassName={s.filter_modal_content}
          >
            <Modal.Header closeButton>
              <Modal.Title>Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PriceFilter
                minValue={productsData.minValue}
                maxValue={productsData.maxValue}
              />
              <BrandFilter />
            </Modal.Body>
          </Modal>
        </div>

        <div className={s.filters_inHamburger}>
          <PriceFilter
            minValue={productsData.minValue}
            maxValue={productsData.maxValue}
          />
          <BrandFilter />
        </div>
      </div>
      <div className={s.products}>
        {productsData.products.map((item) => (
          <ProductCard key={item._id} productData={item} />
        ))}
      </div>
    </div>
  );
}
