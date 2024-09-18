import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { styled } from "styled-components";
import { API } from "../../../API/api";
import { useAuthData } from "../../../provider/provider";
import { deleteProduct } from "../../../redux/cartSlice";

export default function DeleteItemFromCart({
  productId,
  price,
  quantity,
}: {
  productId: string;
  price: number;
  quantity: number;
}) {
  const { authUserData } = useAuthData();
  const dispatch = useDispatch();

  const onDeleteItem = async () => {
    if (!authUserData.userData) {
      return <Navigate to={`/login`} />;
    }
    const response = await API.deleteProductFromCart(
      authUserData.userData._id,
      productId
    );
    if (response.status === 200) {
      dispatch(deleteProduct({ productId, price, quantity }));
    }
  };
  return (
    <DeleteIcon
      onClick={onDeleteItem}
      className="fa-solid fa-trash-can fa-lg"
    ></DeleteIcon>
  );
}

const DeleteIcon = styled.i`
  /* color: #e1e1e1; */
  color: var(--light_gray);
  transition: all 0.2s linear;
  &:hover {
    color: #e06469;
    transform: scale(1.2);
    cursor: pointer;
  }
`;
