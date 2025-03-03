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

const TITLE = "PRODUCTS";

// const PAGE_TYPE = {
//   bestSellers: {},
//   newlyAdded: {},
//   accessories: {},
//   women: {},
//   men: {},
//   healthAndBeauty: {},
//   products: {
//     id: 1,
//     title: "ALL PRODUCTS",
//     items: [
//       {
//         _id: "61287a98d783f13644c57723",
//         rating: 0,
//         itemName: "gray pallette socks",
//         size: "medium",
//         stockQuantity: 1,
//         price: "9.50",
//         currency: "pounds",
//         color: "white",
//         categoryId: "964ee732-71b4-11ea-8d93-0603130a05b8",
//         imageUrl:
//           "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b3a467fb-4c84-44b0-9be9-589391fa2065/U+NK+EVERYDAY+LTWT+CREW+3PR.png",
//         option1Name: "sock",
//         option2Name: null,
//         createdAt: "2019-05-07T23:13:18.000Z",
//         updatedAt: "2021-08-26T05:39:45.000Z",
//         user: "61287a98d783f13644c5770c",
//         reviews: [],
//       },
//       {
//         _id: "61287a98d783f13644c57723",
//         rating: 0,
//         itemName: "gray pallette socks",
//         size: "medium",
//         stockQuantity: 1,
//         price: "9.50",
//         currency: "pounds",
//         color: "white",
//         categoryId: "964ee732-71b4-11ea-8d93-0603130a05b8",
//         imageUrl:
//           "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b3a467fb-4c84-44b0-9be9-589391fa2065/U+NK+EVERYDAY+LTWT+CREW+3PR.png",
//         option1Name: "sock",
//         option2Name: null,
//         createdAt: "2019-05-07T23:13:18.000Z",
//         updatedAt: "2021-08-26T05:39:45.000Z",
//         user: "61287a98d783f13644c5770c",
//         reviews: [],
//       },
//       {
//         _id: "61287a98d783f13644c57723",
//         rating: 0,
//         itemName: "gray pallette socks",
//         size: "medium",
//         stockQuantity: 1,
//         price: "9.50",
//         currency: "pounds",
//         color: "white",
//         categoryId: "964ee732-71b4-11ea-8d93-0603130a05b8",
//         imageUrl:
//           "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b3a467fb-4c84-44b0-9be9-589391fa2065/U+NK+EVERYDAY+LTWT+CREW+3PR.png",
//         option1Name: "sock",
//         option2Name: null,
//         createdAt: "2019-05-07T23:13:18.000Z",
//         updatedAt: "2021-08-26T05:39:45.000Z",
//         user: "61287a98d783f13644c5770c",
//         reviews: [],
//       },
//       {
//         _id: "61287a98d783f13644c57723",
//         rating: 0,
//         itemName: "gray pallette socks",
//         size: "medium",
//         stockQuantity: 1,
//         price: "9.50",
//         currency: "pounds",
//         color: "white",
//         categoryId: "964ee732-71b4-11ea-8d93-0603130a05b8",
//         imageUrl:
//           "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b3a467fb-4c84-44b0-9be9-589391fa2065/U+NK+EVERYDAY+LTWT+CREW+3PR.png",
//         option1Name: "sock",
//         option2Name: null,
//         createdAt: "2019-05-07T23:13:18.000Z",
//         updatedAt: "2021-08-26T05:39:45.000Z",
//         user: "61287a98d783f13644c5770c",
//         reviews: [],
//       },
//       {
//         _id: "61287a98d783f13644c57723",
//         rating: 0,
//         itemName: "gray pallette socks",
//         size: "medium",
//         stockQuantity: 1,
//         price: "9.50",
//         currency: "pounds",
//         color: "white",
//         categoryId: "964ee732-71b4-11ea-8d93-0603130a05b8",
//         imageUrl:
//           "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b3a467fb-4c84-44b0-9be9-589391fa2065/U+NK+EVERYDAY+LTWT+CREW+3PR.png",
//         option1Name: "sock",
//         option2Name: null,
//         createdAt: "2019-05-07T23:13:18.000Z",
//         updatedAt: "2021-08-26T05:39:45.000Z",
//         user: "61287a98d783f13644c5770c",
//         reviews: [],
//       },
//       {
//         _id: "61287a98d783f13644c57723",
//         rating: 0,
//         itemName: "gray pallette socks",
//         size: "medium",
//         stockQuantity: 1,
//         price: "9.50",
//         currency: "pounds",
//         color: "white",
//         categoryId: "964ee732-71b4-11ea-8d93-0603130a05b8",
//         imageUrl:
//           "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b3a467fb-4c84-44b0-9be9-589391fa2065/U+NK+EVERYDAY+LTWT+CREW+3PR.png",
//         option1Name: "sock",
//         option2Name: null,
//         createdAt: "2019-05-07T23:13:18.000Z",
//         updatedAt: "2021-08-26T05:39:45.000Z",
//         user: "61287a98d783f13644c5770c",
//         reviews: [],
//       },
//     ],
//   },
// };

const ProductsScreen = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const pageName = pathname.split("/")[1];

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  console.log({ productList });

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // const currentPage = PAGE_TYPE?.[pageName];

  // const products = get(currentPage, "items", []);
  // const title = get(currentPage, "title", "");

  return (
    <div>
      <Helmet>
        <title>BACKYARD STORE</title>
        <meta
          name='description'
          content='Retaurant online store for delivery'></meta>
      </Helmet>

      <h1 style={{ textAlign: "center" }}>{TITLE}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}is</Message>
      ) : (
        <div className={styles.productsContainer}>
          {products.map((product) => {
            return <Card key={product?._id} {...product} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsScreen;
