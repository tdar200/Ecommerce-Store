import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

import Card from "../components/Card";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import styles from "../css/ProductCreateScreen.module.css";

const GENDER_LIST = ["MALE", "FEMALE", "UNISEX"];
const SIZE_LIST = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];
const CURRENCY_LIST = ["GBP", "PKR"];
const COLOR_LIST = [{ name: "BLACK", value: "#000000" }];
const CATEGORY_LIST = [
  "APPAREL",
  "ACCESSORIES",
  "BEAUTY",
  "HEALTH & FITNESS",
  "ELECTRONICS",
];

const ProductCreateScreen = ({ match, history }) => {
  const paramsArr = history.location.pathname.split("/");
  const lastParam = paramsArr[paramsArr.length - 1];

  const productId = match.params.id;

  const [name, setName] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState(SIZE_LIST[0]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [color, setColor] = useState(COLOR_LIST[0]);
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState(GENDER_LIST[0]);
  const [currency, setCurrency] = useState(CURRENCY_LIST[0]);
  const [estimatedDelivery, setEstimatedDelivery] = useState(dayjs(new Date()));

  console.log({ estimatedDelivery });

  const cardItems = {
    itemName: name,
    price: sellingPrice,
    currency,
    size,
    stockQuantity: countInStock,
    color,
    category,
    imageUrl: image,
    gender,
  };

  const dispatch = useDispatch();

  const isCreate = lastParam === "create";

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (lastParam === "create") {
      } else if (lastParam === "edit") {
        if (!product.item_name || product._id !== productId) {
          dispatch(listProductDetails(productId));
        } else {
          setName(product.item_name);
          setSellingPrice(product.price);
          setImage(product.image_url);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        sellingPrice,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const profit = sellingPrice - purchasePrice;
  const margin = Number((profit / sellingPrice) * 100);

  return (
    <div className={styles.container}>
      <a href='/admin/productlist'>Go Back</a>
      <h1>{isCreate ? "Create Product" : "Edit Product"}</h1>
      {loadingUpdate && !isCreate && <Loader />}
      {errorUpdate && !isCreate && (
        <Message variant='danger'>{errorUpdate}</Message>
      )}
      {loading && !isCreate ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <form onSubmit={submitHandler}>
              <Form.Group controlId='item-name'>
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter item name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}></Form.Control>
              </Form.Group>

              <FormControl sx={{ width: 300 }}>
                <InputLabel id='category-dropdown'>Category</InputLabel>
                <Select
                  labelId='category-dropdown'
                  id='category-select'
                  value={category}
                  label='Category'
                  onChange={(event) => setCategory(event.target.value)}>
                  {CATEGORY_LIST.map((category, idx) => (
                    <MenuItem key={category - idx} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ width: 300 }}>
                <InputLabel id='currency-dropdown'>Currency</InputLabel>
                <Select
                  labelId='currency-dropdown'
                  id='currency-select'
                  value={currency}
                  label='Currency'
                  onChange={(event) => setCurrency(event.target.value)}>
                  {CURRENCY_LIST.map((currency, idx) => (
                    <MenuItem key={currency - idx} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor='outlined-adornment-purchase-price'>
                  Purchase Price
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-purchase-price'
                  startAdornment={
                    <InputAdornment position='start'>{currency}</InputAdornment>
                  }
                  label='Purchase Price'
                  value={purchasePrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value > 0) {
                      setPurchasePrice(Number(e.target.value));
                    } else {
                      setPurchasePrice(0);
                    }
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor='outlined-adornment-selling-price'>
                  Selling Price
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-selling-price'
                  startAdornment={
                    <InputAdornment position='start'>{currency}</InputAdornment>
                  }
                  type='number'
                  value={sellingPrice}
                  label='Selling Price'
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value > 0) {
                      setSellingPrice(Number(e.target.value));
                    } else {
                      setSellingPrice(0);
                    }
                  }}
                />
              </FormControl>

              <FormControl sx={{ width: 300 }}>
                <InputLabel id='size-dropdown'>Size</InputLabel>
                <Select
                  labelId='size-dropdown'
                  id='size-select'
                  value={size}
                  label='Size'
                  onChange={(event) => setSize(event.target.value)}>
                  {SIZE_LIST.map((size, idx) => (
                    <MenuItem key={size - idx} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ width: 300 }}>
                <InputLabel id='color-dropdown'>Color</InputLabel>
                <Select
                  labelId='color-dropdown'
                  id='color-select'
                  value={color?.name}
                  label='Color'
                  onChange={(event) => setColor(event.target.value)}>
                  {COLOR_LIST.map((color, idx) => (
                    <MenuItem key={color?.name - idx} value={color?.name}>
                      {color?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Estimated Delivery Date'
                  value={estimatedDelivery}
                  onChange={(newValue) => setEstimatedDelivery(newValue)}
                />
              </LocalizationProvider>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter countInStock'
                  value={countInStock}
                  onChange={(e) =>
                    setCountInStock(e.target.value)
                  }></Form.Control>
              </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }></Form.Control>
              </Form.Group>
              <FormControl sx={{ width: 300 }}>
                <InputLabel id='gender-dropdown'>Gender</InputLabel>
                <Select
                  labelId='gender-dropdown'
                  id='gender-select'
                  value={gender}
                  label='Gender'
                  onChange={(event) => setGender(event.target.value)}>
                  {GENDER_LIST.map((gender, idx) => (
                    <MenuItem key={gender - idx} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button type='submit'>{isCreate ? "Create" : "Update"}</button>
            </form>
          </div>
          <div className={styles.previewWrapper}>
            <Card {...cardItems} height={"60vh"} width={"50vh"} />
            <div className={styles.profitWrapper}>
              <span>
                Profit : {currency} {Number(profit).toFixed(2)}{" "}
              </span>
              <span>Margin : {margin} %</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCreateScreen;
