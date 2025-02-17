import React, { useEffect, useState } from "react";
import styles from "./styles/Carousel.module.css";

import get from "lodash/get";

const TIMER = 3000;

const list = [
  {
    id: 1,
    heading: "This is the first slide",
    subHeading: "",
    imageURL:
      "https://thebigsmoke.com.au/wp-content/uploads/happy-people-group-fb.jpg",
  },
  {
    id: 1,
    heading: "This is the second slide",
    subHeading: "",
    imageURL:
      "https://thebigsmoke.com.au/wp-content/uploads/happy-people-group-fb.jpg",
  },
  {
    id: 1,
    heading: "This is the third slide",
    subHeading: "",
    imageURL:
      "https://thebigsmoke.com.au/wp-content/uploads/happy-people-group-fb.jpg",
  },
  {
    id: 1,
    heading: "This is the last slide",
    subHeading: "",
    imageURL:
      "https://thebigsmoke.com.au/wp-content/uploads/happy-people-group-fb.jpg",
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
  const currentHeading = get(currentSlide, "heading", "");
  const currentSubHeading = get(currentSlide, "subHeading", "");

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
            <h2>{currentSubHeading}</h2>
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
