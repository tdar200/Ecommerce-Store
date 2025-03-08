import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (id, qty, vid) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  const {
    _id,
    item_name,
    selling_price,
    currency,
    description,
    size,
    stockQuantity,
    color,
    category,
    image_url,
    createdAt,
    updatedAt,
    user,
    reviews,
    height,
    width,
    brand,
    gender,
  } = data;
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: _id,
      name: item_name,
      image: image_url,
      price: selling_price,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
