import React, { useEffect, useState } from "react";
import styles from "./styles/Carousel.module.css";

import get from "lodash/get";

const TIMER = 3000;

const list = [
  {
    id: 1,
    brand: "DIOR",
    product: "Sauvage",
    imageURL:
      "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dwcd977ac7/images/beauty/01-FRAGRANCES/2024/SAUVAGE-EAU-FORTE/PLP/A24F094_SAUVAGE_EAU_FORTE_Instit_Pack_5550x2000.jpg?sw=1850",
  },
  {
    id: 2,
    brand: "BOSS",
    product: "",
    imageURL:
      "https://media.gq-magazine.co.uk/photos/610a5f64ab26d1956f02ce97/16:9/w_1920,c_limit/32447-1_1920.00x1080.00_BOSS%20BOTTLED%2020%20_%20EDT%20KV%20_%20W_O%20CTA%20.jpg",
  },
  {
    id: 3,
    brand: "Maison Francis Kurkdjian",
    product: "Baccarat Rouge 540",
    imageURL:
      "https://cdn.mos.cms.futurecdn.net/9zRvyUqMXpBAJi4EmFyzQ9-1280-80.jpg",
  },

  {
    id: 4,
    brand: "CHANEL",
    product: "N° 5",
    imageURL:
      "https://i.guim.co.uk/img/media/6e87213df103952c1a030a472a3bf1e24303b172/0_400_4724_2834/master/4724.jpg?width=1200&quality=85&auto=format&fit=max&s=25f4241df13ff40895f19620f50ac0fc",
  },
];

function Carousel() {
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const newInterval = setInterval(() => {
      setSliderIndex((prev) => {
        if (prev + 1 > list.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, TIMER);

    return () => {
      clearInterval(newInterval);
    };
  }, []);

  const currentSlide = list[sliderIndex];

  const currentId = get(currentSlide, "id", "");
  const currentImage = get(currentSlide, "imageURL", "");
  const currentHeading = get(currentSlide, "brand", "");
  const currentSubHeading = get(currentSlide, "product", "");

  const handleSlider = (idx) => {
    setSliderIndex(idx);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.imageContainer}
          style={{
            backgroundImage: `url(${currentImage})`,
          }}>
          <div className={styles.descriptionContainer}>
            <h1 className={styles.header}>{currentHeading}</h1>
            <h2 className={styles.subHeading}>{currentSubHeading}</h2>
            <h3 className={styles.shopNow}>SHOP NOW</h3>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {list.map((item, idx) => {
          return (
            <button
              style={
                sliderIndex === idx ? { width: "20px", opacity: "100%" } : {}
              }
              key={`${item.id}-${idx}`}
              className={styles.slider}
              onClick={() => {
                handleSlider(idx);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
