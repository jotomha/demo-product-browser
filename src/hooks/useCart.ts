import axios from "axios";
import { Cart } from "../components/CartDisplay";

export interface CartPost {
  id: number;
  quantity: number;
}

// Retrieve a new cart with the specified products. Used to update + rerender the cart at each addition to cart, since
// other functions don't work here.
export const getCart = (setCart: (c: Cart) => void, products: CartPost[]) => {
  if (products.length === 0) {
    // API doesn't allow you to add an empty cart.
    setCart({} as Cart);
    return;
  }
  const api = axios.create({
    baseURL: "https://dummyjson.com",
  });
  //Req data
  api
    .post<Cart>("/carts/add", {
      userId: 1,
      products: products,
    })
    .then((res) => {
      setCart(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Note: With this dummy API, since there's no data being actually stored, there's no "cart" to update. Cart id, item id and item quantity
// would need to be passed to use this put request correctly, but in this demo application there's no use for this function.
export const addItem = (
  setCart: (c: Cart) => void,
  cartId = 1,
  itemId = 1,
  iQuantity = 1
) => {
  const api = axios.create({
    baseURL: "https://dummyjson.com",
  });
  api
    .put<Cart>(`/carts/${cartId}`, {
      merge: true,
      products: [
        {
          id: itemId,
          quantity: iQuantity,
        },
      ],
    })
    .then((res) => {
      setCart(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//Just like above, this function wouldn't be usable in the demo case here. I decided not to implement it for that reason. However, with the limited
// powers of the dummy API, and there only being an "update cart" function, I'd imagine this call would look something along the lines of:
// --> parameters: (oldCart, removeId)
// api call: merge: false, products [oldCart.products \ product===removeId]
export const remItem = () => {};
