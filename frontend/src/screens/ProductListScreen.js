import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import styles from "../css/ProductList.module.css";
import { Title } from "../components/Typography";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    history.push(`/admin/product/create`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Title>Products List</Title>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "65vh" }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell>IMAGE</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>CATEGORY</TableCell>
                  <TableCell>CURRENCY</TableCell>
                  <TableCell>SELLING PRICE</TableCell>
                  <TableCell>PURCHASE PRICE</TableCell>
                  <TableCell>SIZE</TableCell>
                  <TableCell>STOCK QUANTITY</TableCell>
                  <TableCell>EDIT</TableCell>
                  <TableCell>DELETE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((product) => {
                  const {
                    _id,
                    item_name,
                    purchase_price,
                    selling_price,
                    currency,
                    description,
                    size,
                    quantity,
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
                  } = product;
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={_id}>
                      <TableCell>
                        <img
                          className={styles.tableImage}
                          src={image_url}
                          alt={item_name}
                        />
                      </TableCell>
                      <TableCell>{item_name}</TableCell>
                      <TableCell>{category}</TableCell>
                      <TableCell>{currency}</TableCell>
                      <TableCell>{selling_price}</TableCell>
                      <TableCell>{purchase_price}</TableCell>
                      <TableCell>{size}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>
                        <button className={styles.buttonWrapper}>Edit</button>
                      </TableCell>
                      <TableCell>
                        <button className={styles.buttonWrapper}>Delete</button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default ProductListScreen;
