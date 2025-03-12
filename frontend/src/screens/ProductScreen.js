import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

import styles from "../css/Product.module.css";

const PHONE_NUMBER = "+923161432871";

const ProductScreen = ({ match, history }) => {
  const [productList, setProductList] = useState({});

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => {
    return state.productDetails;
  });
  const { error, loading, product } = productDetails;

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
  } = product ?? {};

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match.params.id]);

  const decrement = (index) => {
    const list = { ...productList };
    if (list[index] > 1) {
      list[index] += -1;
      setProductList(list);
    }
  };

  const increment = (index) => {
    const list = { ...productList };
    list[index] += 1;
    setProductList(list);
  };

  const addToCartHandler = () => {
    // history.push(`/cart/${match.params.id}?qty=1}`);
    window.open(`https://wa.me/${PHONE_NUMBER}`, "_blank");
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className={styles.leftSection}>
            <img src={image_url} alt={item_name}></img>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.rightSectionWrapper}>
              <div className={styles.productDescription}>
                <h5 className={styles.gender}>{gender.toUpperCase()}</h5>
                <h4 className={styles.title}>{item_name?.toUpperCase()}</h4>
                <h4 className={styles.brand}>{brand?.toUpperCase()}</h4>
                <h3 className={styles.price}>
                  {currency === "gbp" ? "£" : "PKR"}
                  {parseFloat(selling_price).toFixed(2)}
                </h3>

                {color[0]?.name && (
                  <span className={styles.colorSection}>
                    <h4 className={styles.colorTitle}>COLOUR:</h4>
                    <h4 className={styles.colorName}>
                      {color[0]?.name?.toLowerCase()}
                    </h4>
                  </span>
                )}

                {size && (
                  <span className={styles.sizeSection}>
                    <h4 className={styles.sizeTitle}>SIZE:</h4>
                    <h4 className={styles.sizeName}>{size?.toLowerCase()}</h4>
                  </span>
                )}
              </div>
              <button
                className={styles.buttonWrapper}
                onClick={() => addToCartHandler()}>
                Contact on Whatsapp
              </button>
              <h4 className={styles.freeShipping}>
                Free Standard Delivery on all orders
              </h4>

              {description && (
                <span className={styles.descriptionSection}>
                  <h4 className={styles.descriptionTitle}>DESCRIPTION:</h4>
                  <h4 className={styles.descriptionName}>{description}</h4>
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
