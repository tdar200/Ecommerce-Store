import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../actions/productActions";
import Carousel from "../components/Carousel";
import ExploreProducts from "../components/HomeScreen/ExploreProducts";
import DealsComponent from "../components/HomeScreen/DealsComponent";
import FeaturedProduct from "../components/HomeScreen/FeaturedProduct";
import DeliveryProduct from "../components/HomeScreen/DeliveryProduct";
import SpaceComponent from "../components/SpaceComponent";

const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const handleClick = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <title>Backyard Store</title>
        <meta name='description' content='Online Store'></meta>
      </Helmet>

      {!loading && (
        <>
          <Carousel />
          {/* <DealsComponent /> */}
          <ExploreProducts />
          {/* <FeaturedProduct /> */}
          <SpaceComponent />
          <DeliveryProduct />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
