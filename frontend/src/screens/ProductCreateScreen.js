import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProductDetails,
  updateProduct,
  createProduct,
} from "../actions/productActions";
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
import { Title } from "../components/Typography";

import isMobileScreen from "../hooks/isMobileScreen";

const GENDER_LIST = ["UNISEX", "MALE", "FEMALE"];
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

const BRAND_LIST = ["LEVIS"];

const ProductCreateScreen = ({ match, history }) => {
  const paramsArr = history.location.pathname.split("/");
  const lastParam = paramsArr[paramsArr.length - 1];

  const productId = match.params.id;

  const device = isMobileScreen();

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

  const cardItems = {
    item_name: name,
    selling_price: sellingPrice,
    currency,
    size,
    stockQuantity: countInStock,
    color,
    category,
    image_url: image,
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

    const payload = {
      name,
      sellingPrice,
      purchasePrice,
      image,
      brand: brand.toLowerCase(),
      size: size.toLowerCase(),
      category: category.toLowerCase(),
      countInStock,
      color,
      description,
      gender: gender.toLowerCase(),
      currency: currency.toLowerCase(),
      estimatedDelivery,
    };

    isCreate
      ? dispatch(createProduct(payload))
      : dispatch(updateProduct(payload));
  };

  const profit = sellingPrice - purchasePrice;
  const margin = Number((profit / sellingPrice) * 100);

  return (
    <div className={styles.container}>
      <Title>{isCreate ? "Create Product" : "Edit Product"}</Title>
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
            <form className={styles.formComponent} onSubmit={submitHandler}>
              <div className={styles.inputWrapper}>
                <FormControl fullWidth>
                  <InputLabel id='outlined-input-item-name'>
                    Item Name
                  </InputLabel>
                  <OutlinedInput
                    required
                    id='outlined-input-item-item'
                    label='Item Name'
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                  />
                </FormControl>
              </div>

              <FormControl fullWidth>
                <InputLabel id='outlined-input-image-url'>Image URL</InputLabel>
                <OutlinedInput
                  required
                  className={styles.inputWrapper}
                  id='outlined-input-image-url'
                  label='Image URL'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </FormControl>

              <div className={styles.inputContainer}>
                <FormControl sx={{ flexBasis: "47%" }}>
                  <InputLabel id='category-dropdown'>Category</InputLabel>
                  <Select
                    required
                    className={styles.inputWrapper}
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

                <FormControl sx={{ flexBasis: "47%" }}>
                  <InputLabel id='currency-dropdown'>Currency</InputLabel>
                  <Select
                    required
                    className={styles.inputWrapper}
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

                <FormControl sx={{ flexBasis: "47%" }}>
                  <InputLabel id='outlined-adornment-purchase-price'>
                    Purchase Price
                  </InputLabel>
                  <OutlinedInput
                    className={styles.inputWrapper}
                    id='outlined-adornment-purchase-price'
                    startAdornment={
                      <InputAdornment position='start'>
                        {currency}
                      </InputAdornment>
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

                <FormControl sx={{ flexBasis: "47%" }}>
                  <InputLabel htmlFor='outlined-adornment-selling-price'>
                    Selling Price
                  </InputLabel>
                  <OutlinedInput
                    required
                    className={styles.inputWrapper}
                    id='outlined-adornment-selling-price'
                    startAdornment={
                      <InputAdornment position='start'>
                        {currency}
                      </InputAdornment>
                    }
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

                <FormControl sx={{ flexBasis: "47%" }}>
                  <InputLabel id='size-dropdown'>Size</InputLabel>
                  <Select
                    className={styles.inputWrapper}
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

                <FormControl sx={{ flexBasis: "47%" }}>
                  <InputLabel id='color-dropdown'>Color</InputLabel>
                  <Select
                    className={styles.inputWrapper}
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

                <FormControl sx={{ flexBasis: "47%", marginBottom: "1rem" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Estimated Delivery Date'
                      value={estimatedDelivery}
                      onChange={(newValue) => setEstimatedDelivery(newValue)}
                    />
                  </LocalizationProvider>
                </FormControl>

                <FormControl sx={{ flexBasis: "47%" }}>
                  <InputLabel id='brand-dropdown'>Brand</InputLabel>
                  <Select
                    className={styles.inputWrapper}
                    labelId='brand-dropdown'
                    id='brand-select'
                    label='Brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required>
                    {BRAND_LIST.map((brand, idx) => (
                      <MenuItem key={brand - idx} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ flexBasis: "47%" }}>
                  <InputLabel id='outlined-input-stock-count'>
                    Count In Stock
                  </InputLabel>
                  <OutlinedInput
                    className={styles.inputWrapper}
                    id='outlined-input-stock-count'
                    label='Count In Stock'
                    value={countInStock}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value > 0) {
                        setCountInStock(Number(e.target.value));
                      } else {
                        setCountInStock(0);
                      }
                    }}
                  />
                </FormControl>

                <FormControl sx={{ flexBasis: "47%" }}>
                  <InputLabel id='gender-dropdown'>Gender</InputLabel>
                  <Select
                    className={styles.inputWrapper}
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
              </div>

              <FormControl fullWidth>
                <InputLabel id='outlined-input-description'>
                  Description
                </InputLabel>
                <OutlinedInput
                  sx={{ marginBottom: "1rem" }}
                  id='outlined-input-description'
                  label='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  maxRows={3}
                  variant='standard'
                />
              </FormControl>

              {device > 900 && (
                <button className={styles.buttonWrapper} type='submit'>
                  {isCreate ? "Create" : "Update"}
                </button>
              )}
            </form>
          </div>
          <div className={styles.previewWrapper}>
            <Card
              {...cardItems}
              height={device > 900 ? "80vh" : "60vh"}
              width={device > 900 ? "50vh" : "40vh"}
            />
            <div className={styles.profitWrapper}>
              <span>
                Profit : {currency} {Number(profit).toFixed(2)}{" "}
              </span>
              <span>Margin : {isNaN(margin) ? 0 : margin} %</span>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {device < 900 && (
              <button className={styles.buttonWrapper} type='submit'>
                {isCreate ? "Create" : "Update"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCreateScreen;
