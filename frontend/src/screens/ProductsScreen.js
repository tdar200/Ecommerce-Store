import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
// import { Row, Col, Card } from "react-bootstrap";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

import get from "lodash/get";
import styles from "../css/Products.module.css";

import { Title } from "../components/Typography";
import { useHistory } from "react-router-dom";

const TITLE = "PRODUCTS";

const ProductsScreen = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const pageName = pathname.split("/")[1];
  const history = useHistory();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // const currentPage = PAGE_TYPE?.[pageName];

  // const products = get(currentPage, "items", []);
  // const title = get(currentPage, "title", "");

  const clickHandler = (id) => {
    console.log("is this hitting", id);
    history.push(`/product/${id}`);
  };

  return (
    <div>
      <Helmet>
        <title>BACKYARD STORE</title>
        <meta
          name='description'
          content='Retaurant online store for delivery'></meta>
      </Helmet>

      <Title>{TITLE}</Title>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}is</Message>
      ) : (
        <div className={styles.productsContainer}>
          {products.map((product) => {
            const { _id } = product;
            return (
              <a href={`/product/${_id}`} key={_id}>
                <Card {...product} />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsScreen;
