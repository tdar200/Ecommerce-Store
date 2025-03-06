import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

import styles from "../css/Product.module.css";

const ProductScreen = ({ match, history }) => {
  const [productList, setProductList] = useState({});

  const dispatch = useDispatch();

  console.log({ dispatch });

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

    // product?.variants &&
    //   product.variants.map((items) => {
    //     const pName = items.option1_value
    //       ? items.option1_value
    //       : product.item_name;

    //     obj[pName] = 1;
    //   });

    // setProductList(() => ({ ...obj }));

    // if (successProductReview) {
    //   setRating(0);
    //   setComment("");
    // }

    // if (successProductReview) {
    //   dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    // }
  }, [match.params.id]);

  // useMemo(() => {
  //   if (productList) {
  //     let list = { ...productList };
  //     product.variants &&
  //       product.variants.map((items, index1) => {
  //         cartItems.map((cart, index2) => {
  //           if (cart.vid === items.variant_id) {
  //             list[cart.option1_value] = cart.qty;
  //           }
  //         });
  //       });

  //     setProductList(() => ({ ...list }));
  //   }
  // }, [cartItems, product.variants]);

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

  const addToCartHandler = (vid, index) => {
    history.push(
      `/cart/${match.params.id}?vid=${vid}?qty=${productList[index]}`
    );
  };

  console.log({ product });

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div
            style={{ backgroundImage: `url(${image_url})` }}
            className={styles.leftSection}></div>
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
              <button className={styles.buttonWrapper}>ADD TO BAG</button>
              <h4 className={styles.freeShipping}>
                Free Standard Delivery on all orders
              </h4>
            </div>
          </div>

          {/* <h1 style={{ textAlign: "center" }}>
            <strong>{product.item_name}</strong>
          </h1> */}
          {/* <Row style={{ display: "flex", justifyContent: "center" }}>
            {product.variants.map((item, index) => {
              return (
                <Col
                  style={{ padding: "5px" }}
                  sm={16}
                  md={6}
                  lg={4}
                  xl={3}
                  key={index}
                >
                  <Card className='my-3 p-3 rounded'>
                    {item.option1_value && (
                      <Card.Text
                        style={{ textAlign: "center", marginBotton: "10px" }}
                        as='div'
                      >
                        <strong> {item.option1_value} </strong>
                      </Card.Text>
                    )}
                    <Card.Img
                      style={{
                        width: "100%",
                        height: "350px",
                        borderRadius: 3,
                        objectFit: "cover",
                      }}
                      src={product.image_url}
                      variant='top'
                    />

                    <Card.Body>
                      {item.option2_value && (
                        <Card.Text>{item.option2_value}</Card.Text>
                      )}
                      <Card.Title>Rs. {item.default_price}</Card.Title>

                      <Col
                        style={{
                          marginTop: "10px",
                          marginBottom: "5px",
                          width: "100%",
                        }}
                        className='text-center py-3'
                      >
                        <Button
                          className='social-media'
                          type='button'
                          onClick={() => decrement(item.option1_value)}
                          style={{
                            backgroundColor: "red",
                            alignContent: "center",
                            display: "inline-flex",
                            marginInline: "10px",
                          }}
                        >
                          <i
                            style={{ fontSize: "1.1em" }}
                            className='fas fa-minus-square'
                          />
                        </Button>

                        <Card.Subtitle
                          style={{
                            marginInline: "10px",
                            alignContent: "center",
                            display: "inline-flex",
                          }}
                        >
                          Quantity : {productList[item.option1_value]}
                        </Card.Subtitle>

                        <Button
                          type='button'
                          className='social-media'
                          onClick={() => increment(item.option1_value)}
                          style={{
                            backgroundColor: "red",
                            alignContent: "center",
                            display: "inline-flex",
                            marginInline: "10px",
                          }}
                        >
                          <i
                            style={{ fontSize: "1.1em" }}
                            className='fas fa-plus-square'
                          />
                        </Button>
                      </Col>

                      <Button
                        onClick={() =>
                          addToCartHandler(item.variant_id, item.option1_value)
                        }
                        className='social-media'
                        type='button'
                        style={{
                          width: "100%",
                          backgroundColor: "red",
                          fontSize: "0.6em",
                        }}
                      >
                        ADD TO CART
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row> */}
        </>
      )}
    </div>
  );
};

export default ProductScreen;
