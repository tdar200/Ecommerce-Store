import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Title } from "../components/Typography";

import styles from "../css/Cart.module.css";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[2]) : 1;
  const vid = location.search
    ? location.search.split("=")[1].split("?")[0]
    : null;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log({ cartItems });

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, vid));
    }
  }, [dispatch, productId, qty, vid]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className={styles.container}>
      <Title> Cart</Title>
      <div className={styles.wrapper}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyContainer}>
            <h1 className={styles.emptyTitle}>Your Cart is Empty</h1>
            <a className={styles.emptyLink} href='/'>
              Go Home
            </a>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            {cartItems.map((item, index) => {
              return (
                <Row
                  key={item._id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexBasis: "33.3%",
                    padding: "10px",
                    alignItems: "center",
                    textAlign: "center",
                  }}>
                  <Col md={2}>
                    <a href={`/product/${item.product}`}>
                      <Image
                        style={{
                          objectFit: "cover",
                          height: "150px",
                          width: "150px",
                        }}
                        src={item.image}
                        fluid
                        rounded></Image>
                    </a>
                  </Col>
                  <Col>x {item.qty}</Col>
                  <Col md={3}>
                    <Row>
                      <h4>{item.option1_value}</h4>
                    </Row>
                    <Row>{item.option2_value}</Row>
                    <Row>{item.name}</Row>
                  </Col>

                  <Col md={2}>Rs.{item.price}</Col>

                  <div>
                    <button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.vid)}>
                      <i className='fas fa-trash' />
                    </button>
                  </div>
                </Row>
              );
            })}
          </div>
        )}

        {cartItems.length > 0 && (
          <Row
            style={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              alignSelf: "center",
              justifyContent: "center",
              margin: "2rem",
            }}>
            <Row style={{ border: "1px solid rgba(0, 0, 0, 0.125" }}>
              <h3 style={{ marginLeft: "1rem" }}>
                Subtotal:{" "}
                {
                  <p>
                    Rs.
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(0)}
                  </p>
                }
              </h3>
            </Row>
          </Row>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
