import { CartProduct } from "../components/CartDisplay";
import { CartPost } from "../hooks/useCart";

//Converts a list of "product" objects to objects that work with the getCart hook (CartPost)
//Probably didn't need to be its own function but it's just so much nicer to be able to call this
//and I wasn't sure how many times I was going to need this functionality (I think I only ended up
//using it once but oh well)
export const productToPost = (products: CartProduct[]) => {
  return products?.map((cp) => {
    return { id: cp.id, quantity: cp.quantity } as CartPost;
  });
};
