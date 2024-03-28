import { CartProduct } from "../components/CartDisplay";
import { CartPost } from "../hooks/useCart";

export const productToPost = (products: CartProduct[]) => {
  return products?.map((cp) => {
    return { id: cp.id, quantity: cp.quantity } as CartPost;
  });
};
