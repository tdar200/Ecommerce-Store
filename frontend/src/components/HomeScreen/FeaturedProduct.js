import React from "react";

function FeaturedProduct() {
  return (
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
          Every month we come out with a new and unique premium deals for you to
          try. Stop by your local Backyard BBQ today to try this month's
          exclusive deal. Hurry in before it's gone and keep your eyes peeled
          for next month's deal.
        </h4>

        <a
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
        </a>
      </div>
    </div>
  );
}

export default FeaturedProduct;
