import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../actions/productActions";
import Carousel from "../components/Carousel";
import ExploreProducts from "../components/HomeScreen/ExploreProducts";
import DealsComponent from "../components/HomeScreen/DealsComponent";

const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch, screenWidth]);

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
          <ExploreProducts />
          <DealsComponent />
          <Carousel />
        </>
      )}

      {!loading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            flex: 2,
          }}
          className='home-div'>
          <div
            style={{
              backgroundImage: `url(https://lamarquise.ae/wp-content/uploads/2020/09/Mix-Grill-Platter-01.jpg)`,
              width: "100%",

              backgroundSize: "cover",
              flex: 1,
              backgroundPosition: "center",
              display: "flex",
            }}
            className='div-image'
          />
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",

              flexDirection: "column",
              backgroundColor: "floralwhite ",
              justifyContent: "center",
            }}
            className='flex-div'>
            <h3
              style={{
                color: "#4a4a4a",

                fontWeight: "900",
                textAlign: "center",
                fontFamily: "Montserrat,sans-serif",
              }}>
              Try our new Arabic Platter !
            </h3>
            <h4
              style={{
                color: "#4a4a4a",

                textAlign: "center",
              }}>
              Every month we come out with a new and unique premium deals for
              you to try. Stop by your local Backyard BBQ today to try this
              month's exclusive deal. Hurry in before it's gone and keep your
              eyes peeled for next month's deal.
            </h4>

            <Link
              style={{
                justifyContent: "center",
                display: "flex",
                alignSelf: "center",
                margin: "2rem",
              }}
              to='/products'>
              <button className='center' variant='contained'>
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>
      )}

      {!loading && (
        <div
          style={{
            backgroundImage: `url(https://images.prismic.io/brinker-chilis/75f65348-f119-445b-8271-f41beb916ded_ChilisWeb_OutToIta_FajitaArray_Q3F20.jpg?auto=compress,format&rect=0,0,1600,512&w=1600&h=512)`,
            width: "100%",
            height: "600px",
            backgroundSize: "cover",
            flex: 1,
            backgroundPosition: "center",
          }}
          className='div-image'>
          <div
            style={{
              display: "grid",
              height: "100%",
              justifyItems: "center",
              alignContent: "center",
            }}>
            <h3
              style={{
                color: "white",

                fontWeight: "900",
                textAlign: "center",
                fontFamily: "Montserrat,sans-serif",
              }}>
              Get Backyard BBQ for Delivery or Pickup now !
            </h3>
            <h4
              style={{
                color: "white",
                fontSize: "20px",
                textAlign: "center",
                lineHeight: "2rem",
              }}>
              We've got food deals the whole family will love for lunch or
              dinner!
            </h4>

            <Link
              style={{
                justifyContent: "center",
                display: "flex",
                padding: "30px",
              }}
              to='/products'>
              <button className='center' variant='contained'>
                ORDER NOW
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
