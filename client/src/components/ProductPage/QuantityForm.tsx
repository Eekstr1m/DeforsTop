import { useState } from "react";
import { ProductI } from "../../interfaces/productsI";
import AddToCart from "../Cart/CartAuxiliaryComponents/AddToCart";
import { QuantityButton } from "../Cart/CartAuxiliaryComponents/QuantityChange/QuantityChange";

export default function QuantityForm({
  productData,
}: {
  productData: ProductI;
}) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <QuantityButton
        className="dec"
        disabled={quantity === 1}
        onClick={() => setQuantity((prev) => prev - 1)}
      />
      <span>{quantity}</span>
      <QuantityButton
        className="inc"
        onClick={() => setQuantity((prev) => prev + 1)}
      />
      <AddToCart item={productData} quantity={quantity} />
    </div>
  );
}
